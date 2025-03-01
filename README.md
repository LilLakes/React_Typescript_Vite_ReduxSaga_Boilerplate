# React + TypeScript + Vite + Redux Saga + Vitest Boilerplate

This boilerplate provides a modern React setup with TypeScript, Vite, and Redux Saga for efficient state management. It includes:

## Features

- **Vite** for fast builds and hot module replacement
- **React 19** with TypeScript for scalable and maintainable development
- **Redux Toolkit & Redux Saga** for advanced state management and side effects handling
- **Vitest** for unit testing with built-in watch mode and coverage reports
- **ESLint** for code quality enforcement
- **Testing Library & JSDOM** for robust component testing

## Scripts

The following scripts are available:

- `npm run dev` - Starts the development server with Vite
- `npm run build` - Compiles TypeScript and builds the project for production
- `npm run lint` - Runs ESLint to check for code quality issues
- `npm run preview` - Serves the production build for previewing
- `npm run test` - Runs all unit tests with Vitest
- `npm run test:watch` - Runs tests in watch mode for continuous feedback
- `npm run test:coverage` - Runs tests and generates a coverage report
- `npm run generate:component` - Generates a new React component using a predefined script
- `npm run generate:store` - Generates a new Redux store module (slice + saga) using a predefined script

## Installation

```sh
git clone <repository-url>
cd project-directory
npm install
npm run dev
```

## Usage

- Run `npm run dev` to start development mode
- Run `npm run build` to create a production build
- Run `npm run test` to execute tests
- Use `npm run generate:component` to scaffold new components
- Use `npm run generate:store` to create new Redux store modules

Perfect for kickstarting a performant and scalable React project! 🚀

## Project Structure

### `public`
Contains static files such as `index.html` and other public resources.

### `scripts`
Includes utility scripts for generating components and store:
- `generateComponent.js`: Generates new React components.
- `generateStore.js`: Generates new Redux slices and sagas.

### `src`
The main source code folder.

#### `assets`
Contains static assets like images, fonts, etc.

#### `components`
Reusable components for the application.
- `common`: Common components used throughout the application.
- `CustomButton`: An example of a custom component with associated tests, styles, and types.

#### `containers`
Components that connect Redux state to UI components.
- `TestComponent`: An example container with associated tests, types, and widgets.

#### `hooks`
Custom hooks for reusable logic.
- `useGreetings`: An example hook with associated tests.

#### `store`
Configuration and logic for Redux.
- `counter`: An example slice and saga for managing a counter.
- `tests`: Tests for the store, sagas, and reducers.

#### `types`
TypeScript definitions for common and application-specific types.
- `common.types.ts`: Common types used throughout the application.

## How to Use

1. **Component Generation**: Use `generateComponent.js` to create new components.
2. **Store Generation**: Use `generateStore.js` to create new slices and sagas.
3. **Development**: Add your components, containers, and business logic in the respective folders.
4. **Testing**: Run tests to ensure code quality.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the application in development mode.

## Contributing

Contributions are welcome! Please open an issue or a pull request to suggest improvements or fixes.
