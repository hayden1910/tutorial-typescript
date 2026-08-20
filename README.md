# TypeScript Course

This repo is a **migration of the BroCode JavaScript course to TypeScript**. All the original (JS) code has been rewritten in TypeScript (`.ts`) — with clearer typing, compile-time error checking, and easier maintenance.

## Why TypeScript

TypeScript = JavaScript + types. It is a **superset** of JS, so all JS code is valid — but TS adds:

| Feature | What it gives you |
| --- | --- |
| **Static typing** | Declare types for variables, parameters, functions (`: string`, `: number`, `: boolean`...) |
| **Early error detection** | The IDE reports errors as you type, before runtime — fewer runtime bugs |
| **Autocomplete & IntelliSense** | Property, parameter, and return-type hints right in the editor |
| **Interfaces & type aliases** | Define the "shape" of objects and API data |
| **Generics** | Functions/classes that work with multiple types safely (`Array<T>`) |
| **Enums** | Named sets of constants, easier to read |
| **Tuples** | Fixed-length arrays with typed positions |
| **`null`/`undefined` safety** | Forces handling of empty values (`noUncheckedIndexedAccess`) |
| **Strict mode** | `strict: true` — strict checking across all code |
| **Modules (`import`/`export`)** | Split code into standard ES6 modules |
| **Typed DOM** | HTML/DOM manipulation with full typing (`HTMLElement`, `Event`...) |
| **Compiles to JS** | `tsc` transpiles `.ts` → `.js` that runs in any browser |

## Repository structure

```
src/
├── index.ts                  # Console test file (Node)
├── basics/                   # Fundamentals (lessons 1–23, 55, 57)
├── arrays/                   # Arrays, functions & higher-order functions
├── functions/                # Functions, callbacks, map/filter/reduce
├── oop/                      # Objects, classes, inheritance (37–50)
├── dom/                      # DOM manipulation & events (59–67)
├── async/                    # Async code, promises, fetch (52–74)
└── projects/                 # Mini web apps (HTML + CSS + TS)
```

Each lesson lives in its own folder. A lesson contains a `.ts` source file that compiles to a `.js` file right next to it; HTML files load that compiled `.js`. **No extra configuration needed** — `tsc` scans the whole `src/` folder.

## Running the project

```bash
npm install        # install dependencies (typescript, @types/node)
npm run build      # compile all .ts -> .js (next to each .ts file)
npm run watch      # recompile on every file save
npx tsc src/${module-name}/${sub-module-name}/${file-name} --ignoreConfig # build for specific module
```

### Running a `.ts` file with Node

Node 24+ runs TypeScript directly (type stripping) — no build step needed:

```bash
node src/index.ts
```

## Tooling

- **TypeScript 7** (`tsc`) — compiles TS → JS
- **Node 24+** — runs `.ts` directly (type stripping)
- **Live Server** — serves pages with auto reload