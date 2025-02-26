import { readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile, stat, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const capitalize = (str) => str.replace(/^./, (match) => match.toUpperCase());

const __dirname = dirname(fileURLToPath(import.meta.url));
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Errore: Specifica il nome del modulo.");
  process.exit(1);
}

const basePath = join(__dirname, "..", "src", "store", moduleName.toLowerCase());

// Funzione per controllare se la cartella esiste già
async function checkIfExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

// 📌 TEMPLATE
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

// 📌 STRUTTURA DELLE CARTELLE E FILE
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
      console.error(`❌ Errore: Esiste già un modulo store con il nome "${moduleName}".`);
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
    const sagaPath = join(basePath, "..", "rootSaga.ts"); // Sostituisci con il percorso corretto
    let sagaContent = readFileSync(sagaPath, "utf8");
    const sagaImportStatement = `import ${moduleName}Saga from "./${moduleName}/${moduleName}Saga";\n`;
    const sagaExportRegex = /yield all\(\[([^}]*)\]\)/;

    if (sagaContent.includes(sagaImportStatement)) {
        console.log("Il componente è già presente nel file.");
        return;
    }

    // Aggiunge l'import
    sagaContent = sagaContent.replace(/(import .*;\n)/, `$1${sagaImportStatement}`);

    // Aggiunge l'export
    sagaContent = sagaContent.replace(sagaExportRegex, (match, exports) => {
        return `yield all([${exports.trim()}, ${moduleName}Saga()])`;
    });

    writeFileSync(sagaPath, sagaContent, "utf8");

    //Add to rootReducer
    const indexPath = join(basePath, "..", "rootReducer.ts"); // Sostituisci con il percorso corretto
    let content = readFileSync(indexPath, "utf8");
    const importStatement = `import ${moduleName}Reducer from "./${moduleName}/${moduleName}Slice";\n`;
    const exportRegex = /combineReducers\(\{([^}]*)\}\)/;

    if (content.includes(importStatement)) {
        console.log("Il componente è già presente nel file.");
        return;
    }

    // Aggiunge l'import
    content = content.replace(/(import .*;\n)/, `$1${importStatement}`);

    // Aggiunge l'export
    content = content.replace(exportRegex, (match, exports) => {
        return `combineReducers({\n\t${exports.trim()},\n\t${moduleName}: ${moduleName}Reducer\n})`;
    });

    writeFileSync(indexPath, content, "utf8");

    console.log(`✅ Store module "${moduleName}" creato con successo!`);
  } catch (err) {
    console.error("❌ Errore durante la creazione:", err);
  }
}

createStructure();