import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({ 
    plugins: [
        tsconfigPaths() // Plugin for resolving paths based on tsconfig
    ],
    test: {        
        globals: true, // Enable the use of global functions like describe, it, etc.
        environment: 'jsdom', // Set the environment for tests (e.g., 'jsdom' for DOM-related tests)        
        coverage: {            
            provider: 'v8', // Provider for code coverage (using 'v8' in this case)
            reporter: [ // Coverage reporters to generate (e.g., text, json, html)
                'text', // Print a text report in the console
                'json', // Generate a JSON report in the folder specified in reportsDirectory
                'html' // Generate an HTML report in the folder specified in reportsDirectory
            ], 
            reportsDirectory: './coverage', // Directory to store coverage reports
            exclude: [ // Exclude specific files or patterns from coverage
                'node_modules/*',       // Exclude node_modules
                "dist/*",               // Exclude dist
                "coverage/*",           // Exclude coverage
                "scripts/*",            // Exclude scripts
                '**/*.test.ts',         // Exclude test files
                "vite.config.ts",       // Exclude config files
                "vitest.config.ts",     // Exclude config files
                "eslint.config.js",     // Exclude config files
                "**/index.ts",          // Exclude index files
                "**/*.types.*",         // Exclude type files
                "**/*.d.ts",            // Exclude type files
            ], 
        },
        //setupFiles: [], // Files to run before each test (for global setups)
        //testTimeout: 10000, // Set a custom timeout for tests if needed
    },
});