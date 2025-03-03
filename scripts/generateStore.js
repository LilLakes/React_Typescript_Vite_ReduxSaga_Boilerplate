import { readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile, stat, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const capitalize = (str) => str.replace(/^./, (match) => match.toUpperCase());

const __dirname = dirname(fileURLToPath(import.meta.url));
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Error: Specify the component name.");
  process.exit(1);
}

const basePath = join(__dirname, "..", "src", "store", moduleName.toLowerCase());

// Function to check if the folder already exists
async function checkIfExists(path) {
  try {
    await stat(path);
    return true; // The folder exists
  } catch (error) {
    return false; //The folder doesn't exists
  }
}

// TEMPLATES
const sagaTemplate = `import { delay, put, takeEvery } from 'redux-saga/effects';
import { ${moduleName}Action, ${moduleName}ActionAsync } from './${moduleName}Slice';

// Worker saga
export function* handle${capitalize(moduleName)}Async() {
  yield delay(1000); // Simulate an asynchronous operation
  yield put(${moduleName}Action());
}

// Watcher saga
export default function* ${moduleName}Saga() {
  yield takeEvery(${moduleName}ActionAsync, handle${capitalize(moduleName)}Async);
}`;

const sliceTemplate = `import { createSlice } from '@reduxjs/toolkit';

export interface ${capitalize(moduleName)}State {
  // add your state
}

const initialState: ${capitalize(moduleName)}State = {};

const ${moduleName}Slice = createSlice({
  name: '${moduleName}',
  initialState,
  reducers: {
    ${moduleName}Action: (state) => state,
    ${moduleName}ActionAsync: (state) => state,
    // add your reducers
  },
});

export const { ${moduleName}Action, ${moduleName}ActionAsync } = ${moduleName}Slice.actions;
export default ${moduleName}Slice.reducer;`;

const sagaTestTemplate = `import { delay, put, takeEvery } from 'redux-saga/effects';
import { ${moduleName}Action, ${moduleName}ActionAsync } from '../${moduleName}Slice';
import { describe, expect, it } from 'vitest';
import ${moduleName}Saga, { handle${capitalize(moduleName)}Async } from '../${moduleName}Saga';

describe('${moduleName}Saga', () => {
  it('Should work as intended', () => {
    const saga = handle${capitalize(moduleName)}Async();

    expect(saga.next().value).toEqual(delay(1000));

    expect(saga.next().value).toEqual(put(${moduleName}Action()));

    expect(saga.next().done).toBe(true);
  });

  it('Should watch for ${moduleName}ActionAsync and call handle${capitalize(moduleName)}Async', () => {
    const saga = ${moduleName}Saga();

    expect(saga.next().value).toEqual(takeEvery(${moduleName}ActionAsync, handle${capitalize(moduleName)}Async));
    
    expect(saga.next().done).toBe(true);
  });
});`;

const sliceTestTemplate = `import { describe, expect, it } from 'vitest';
import reducer, { ${moduleName}Action, ${moduleName}ActionAsync } from '../${moduleName}Slice';
  
describe('${moduleName}Slice', () => {
  it('Should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({});
  });

  it('Should handle ${moduleName}Action', () => {
    const previousState = {};
    expect(reducer(previousState, ${moduleName}Action())).toEqual(previousState);
  });

  it('Should handle ${moduleName}ActionAsync', () => {
    const previousState = {};
    expect(reducer(previousState, ${moduleName}ActionAsync())).toEqual(previousState);
  });
});`;

// FOLDER AND FILE STRUCTURE
const structure = {
  "": [
    { fileName: `${moduleName}Saga.ts`, template: sagaTemplate },
    { fileName: `${moduleName}Slice.ts`, template: sliceTemplate }
  ],
  tests: [
    { fileName: `${moduleName}Saga.test.ts`, template: sagaTestTemplate },
    { fileName: `${moduleName}Slice.test.ts`, template: sliceTestTemplate }
  ]
};

async function createStructure() {
  try {
    const exists = await checkIfExists(basePath);
    if (exists) {
      console.error(`❌ Error: A store module with the name "${moduleName}" already exists.`);
      process.exit(1);
    }

    for (const [folder, files] of Object.entries(structure)) {
      const folderPath = join(basePath, folder);
      await mkdir(folderPath, { recursive: true });

      for (const { fileName, template } of files) {
        await writeFile(join(folderPath, fileName), template, "utf8");
      }
    }


    //Add to rootSaga
    const sagaPath = join(basePath, "..", "rootSaga.ts");
    let sagaContent = readFileSync(sagaPath, "utf8");
    const sagaImportStatement = `import ${moduleName}Saga from "./${moduleName}/${moduleName}Saga";\n`;
    const sagaExportRegex = /yield all\(\[([^}]*)\]\)/;

    if (sagaContent.includes(sagaImportStatement)) {
        console.log("The component is already present in the file.");
        return;
    }

    // Adds the import
    sagaContent = sagaContent.replace(/(import .*;\n)/, `$1${sagaImportStatement}`);

    // Adds the export
    sagaContent = sagaContent.replace(sagaExportRegex, (match, exports) => {
        return `yield all([${exports.trim()}, ${moduleName}Saga()])`;
    });

    writeFileSync(sagaPath, sagaContent, "utf8");

    //Add to rootReducer
    const indexPath = join(basePath, "..", "rootReducer.ts");
    let content = readFileSync(indexPath, "utf8");
    const importStatement = `import ${moduleName}Reducer from "./${moduleName}/${moduleName}Slice";\n`;
    const exportRegex = /combineReducers\(\{([^}]*)\}\)/;

    if (content.includes(importStatement)) {
        console.log("The component is already present in the file.");
        return;
    }

    // Adds the import
    content = content.replace(/(import .*;\n)/, `$1${importStatement}`);

    // Adds the export
    content = content.replace(exportRegex, (match, exports) => {
        return `combineReducers({\n\t${exports.trim()},\n\t${moduleName}: ${moduleName}Reducer\n})`;
    });

    writeFileSync(indexPath, content, "utf8");

    console.log(`✅ Redux ${moduleName} slice and saga generated successfully`);
  } catch (err) {
    console.error("❌ Error during generation:", err);
  }
}

createStructure();