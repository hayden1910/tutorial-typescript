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

### Running TS files with different methods

| Command | Use Case | Supports Parameter Properties / Enums |
|---------|----------|----------------------------------------|
| `node file.ts` | Quick test, simple files | ❌ No (type-stripping only) |
| `npx tsx file.ts` | Full TS features, learning/debugging | ✅ Yes |
| `npm run build` then `node file.js` | Production, deployment | ✅ Yes |

## Advanced TypeScript Modules

| Module | File | Topics |
| --- | --- | --- |
| **Generics (Functions)** | `src/functions/generics.ts` | Constraints, defaults, multiple params, `Result<T,E>`, Factory |
| **Generics (Classes)** | `src/oop/generic-classes.ts` | Generic interfaces, `Cache<K,V>`, `Repository<T>`, `Box<T>` |
| **Enums & `as const`** | `src/basics/enums-as-const.ts` | Numeric/string/const enums, modern union approach |
| **Type Guards** | `src/functions/type-guards.ts` | `typeof`/`instanceof`/`in`, predicates, discriminated unions, assertions |
| **Utility Types** | `src/basics/utility-types.ts` | `Partial`, `Pick`, `Omit`, `Record`, `Readonly`, `Exclude`, `Extract`, `ReturnType`, `Parameters`, `Awaited` |
| **Type Operators** | `src/functions/type-operators.ts` | `keyof`, `typeof` (type position), `T[K]` indexed access, EventEmitter |
| **Literal & Intersection** | `src/basics/literal-intersection.ts` | String/numeric/template literals, intersection `&`, branded types, discriminated unions |
| **`satisfies` & `as const`** | `src/basics/satisfies-as-const.ts` | `satisfies` validation, literal preservation, excess property checking, form schemas |
| **Advanced OOP** | `src/oop/advanced-oop.ts` | `abstract` classes, `implements`, `public`/`protected`/`private`, `readonly`, parameter properties, method overloads, `override`, `#private` fields |
| **Index Signatures** | `src/basics/index-signatures.ts` | `[key: string]: T`, `Record<K,V>`, cache, config, event emitter, template literal keys |
| **Mapped & Conditional Types** | `src/functions/mapped-conditional-types.ts` | `{ [K in keyof T]: ... }`, `T extends U ? X : Y`, `infer`, distributive conditionals, `DeepReadonly`, `DeepPartial` |
| **Template Literal Types** | `src/basics/template-literal-types.ts` | `` `on${"Click" | "Change"}` ``, inference with `infer`, route params, CSS props, RBAC, branded types |
| **Declaration Files** | `docs/declaration-files.md` | `.d.ts` structure, `declare module`, `declare global`, module augmentation, ambient declarations, triple-slash references |
| **Advanced tsconfig** | `docs/advanced-tsconfig.md` | Strict flags explanation, `paths` alias, project references, `allowJs`/`checkJs`, environment configs |

## Tooling

- **TypeScript 7** (`tsc`) — compiles TS → JS
- **Node 24+** — runs `.ts` directly (type stripping)
- **Live Server** — serves pages with auto reload