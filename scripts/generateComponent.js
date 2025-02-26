import { readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Errore: Specifica il nome del componente.");
  process.exit(1);
}

const basePath = join(__dirname, "..", "src", "components", "containers", componentName);

// Funzione per controllare se la cartella esiste già
async function checkIfExists(path) {
  try {
    await stat(path);
    return true; // La cartella esiste
  } catch (error) {
    return false; // La cartella non esiste
  }
}

// 📌 TEMPLATE
const tsxTemplate = `import "./${componentName}.css";
import { ${componentName}Props } from "./types/${componentName}.types";

const ${componentName}: React.FC<${componentName}Props> = () => {
  return <div>${componentName} - Automatically generated</div>;
};

export default ${componentName};
`;

const cssTemplate = ``;

const indexTemplate = `export { default as ${componentName} } from './${componentName}';`;

const testTemplate = `import { screen } from '@testing-library/react';
import { RootState } from "@/store/rootReducer";
import { describe, expect, it } from 'vitest';
import { renderWithRedux } from '@/utils/testingUtils';
import ${componentName} from '../${componentName}';

const renderTestComponentWithRedux = (initialStore: Partial<RootState>) => {
    renderWithRedux(<${componentName}/>, initialStore);
}

describe("${componentName}", () => {
    it("Render correctly", () => {
        renderTestComponentWithRedux({});

        expect(screen.getByText("${componentName} - Automatically generated")).toBeTruthy();
    })
});
`;

const typesTemplate = `import { PropsWithChildren } from 'react';

export type ${componentName}Props = PropsWithChildren & {
    // add your own props
};
`;

const widgetIndexTemplate = ``;

// 📌 STRUTTURA DELLE CARTELLE E FILE
const structure = {
  "": [
    { fileName: `${componentName}.tsx`, template: tsxTemplate },
    { fileName: `${componentName}.css`, template: cssTemplate },
    { fileName: "index.ts", template: indexTemplate }
  ],
  tests: [
    { fileName: `${componentName}.test.tsx`, template: testTemplate }
  ],
  types: [
    { fileName: `${componentName}.types.ts`, template: typesTemplate }
  ],
  widget: [
    { fileName: "index.ts", template: widgetIndexTemplate }
  ]
};

async function createStructure() {
  try {
    const exists = await checkIfExists(basePath);
    if (exists) {
      console.error(`❌ Errore: Esiste già un componente con il nome "${componentName}".`);
      process.exit(1);
    }

    // Creazione della struttura delle cartelle e dei file
    for (const [folder, files] of Object.entries(structure)) {
      const folderPath = join(basePath, folder);
      await mkdir(folderPath, { recursive: true });

      for (const { fileName, template } of files) {
        await writeFile(join(folderPath, fileName), template, "utf8");
      }
    }

    const indexPath = join(basePath, "..", "index.ts"); // Sostituisci con il percorso corretto
    let content = readFileSync(indexPath, "utf8");
    const importStatement = `import { ${componentName} } from "./${componentName}";\n`;
    const exportRegex = /export \{([^}]*)\}/;

    if (content.includes(importStatement)) {
        console.log("Il componente è già presente nel file.");
        return;
    }

    // Aggiunge l'import
    content = content.replace(/(import .*;\n)/, `$1${importStatement}`);

    // Aggiunge l'export
    content = content.replace(exportRegex, (match, exports) => {
        return `export {${exports.trim()}, ${componentName}}`;
    });

    writeFileSync(indexPath, content, "utf8");

    console.log(`✅ Componente ${componentName} creato con successo!`);
  } catch (err) {
    console.error("❌ Errore durante la creazione:", err);
  }
}

createStructure();
