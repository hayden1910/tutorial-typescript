# Advanced TypeScript Configuration (tsconfig.json)

This document explains the advanced TypeScript configuration options used in this project.

## Current Project Configuration

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleDetection": "auto",
    "target": "esnext",
    "jsx": "react-jsx",
    "types": [],
    "sourceMap": true,
    "declaration": false,
    "declarationMap": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

---

## Strict Mode Flags

### `strict: true`
Enables all strict type-checking options. This is the **most important** flag for type safety.

**What it enables:**
- `noImplicitAny`
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitThis`
- `alwaysStrict`

---

### `strictNullChecks: true` (enabled by `strict`)
Prevents `null` and `undefined` from being assigned to non-nullable types.

```typescript
// Without strictNullChecks
let name: string = "Alice";
name = null; // OK

// With strictNullChecks
let name: string = "Alice";
name = null; // Error: Type 'null' is not assignable to type 'string'

// Correct way
let name: string | null = "Alice";
name = null; // OK
```

---

### `noUncheckedIndexedAccess: true`
Adds `undefined` to index signature access results.

```typescript
interface User {
  name: string;
  age: number;
}

const users: Record<string, User> = {};

// Without: users["missing"] returns User
// With: users["missing"] returns User | undefined

const user = users["missing"]; // User | undefined
if (user) {
  console.log(user.name); // Safe
}
```

---

### `exactOptionalPropertyTypes: true`
Distinguishes between `?prop: T` (optional) and `prop?: T` (exact optional).

```typescript
interface Config {
  timeout?: number; // exact optional - can be undefined or missing
}

// Without exactOptionalPropertyTypes
const c1: Config = { timeout: undefined }; // OK
const c2: Config = {}; // OK

// With exactOptionalPropertyTypes
const c1: Config = { timeout: undefined }; // Error! undefined is not allowed
const c2: Config = {}; // OK - property is missing
const c3: Config = { timeout: 5000 }; // OK
```

---

### `verbatimModuleSyntax: true`
Requires explicit `import type` / `export type` for type-only imports/exports.

```typescript
// Required with verbatimModuleSyntax
import type { User } from "./types";
import { fetchUser } from "./api";

// Error without 'type' keyword
import { User } from "./types"; // Error if User is only used as type
```

---

## Module & Target Settings

### `module: "esnext"`
Uses ESNext module syntax (import/export). Output depends on `target`.

### `moduleDetection: "auto"`
Automatically detects whether a file is a module based on import/export statements.

### `target: "esnext"`
Compiles to modern JavaScript (ES2022+). Use with modern Node.js (18+).

### `jsx: "react-jsx"`
Uses React 17+ JSX transform (`_jsx` / `_jsxs`). No need for `React` import.

---

## Declaration Files

### `declaration: false`
Doesn't generate `.d.ts` files. Enable for libraries.

### `declarationMap: false`
Doesn't generate `.d.ts.map` files.

---

## Source Maps

### `sourceMap: true`
Generates `.js.map` files for debugging TypeScript in browser/Node.

---

## Module Resolution

### `isolatedModules: true`
Ensures each file can be safely transpiled independently (required for `tsx`, `esbuild`, `swc`).

### `noUncheckedSideEffectImports: true`
Prevents imports that don't use anything from the module (tree-shaking friendly).

### `skipLibCheck: true`
Skips type checking of declaration files in `node_modules`. **Significantly speeds up compilation**.

---

## Type Roots

### `types: []`
Explicitly disables automatic inclusion of `@types/*` packages. Only include what you need:

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "vitest/globals"]
  }
}
```

---

## Recommended Additional Options

### Path Aliases (`paths` / `baseUrl`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

Usage:
```typescript
import { Button } from "@/components/Button";
import { formatDate } from "@/utils/date";
```

---

### Project References (`composite` / `references`)
For monorepos or large projects:

```json
// tsconfig.json (root)
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/api" }
  ]
}
```

```json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

---

### `allowJs` / `checkJs` with JSDoc
Gradually migrate JavaScript to TypeScript:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "maxNodeModuleJsDepth": 2
  }
}
```

```javascript
// @ts-check
/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return `Hello, ${name}!`;
}
```

---

### Build Options
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "noEmit": false
  }
}
```

---

## Environment-Specific Configs

### Development (`tsconfig.dev.json`)
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "watch": true,
    "incremental": true
  }
}
```

### Production (`tsconfig.prod.json`)
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": false,
    "removeComments": true
  }
}
```

---

## Common Issues & Solutions

### "Cannot find namespace 'NodeJS'"
```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

### "Import path can only end with '.ts' extension"
```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true
  }
}
```

### "Module 'xxx' has no exported member 'yyy'"
Check if the export is a type and needs `export type`:
```typescript
// In the library
export type { User };

// In your code (with verbatimModuleSyntax)
import type { User } from "library";
```

### Slow compilation
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

---

## IDE Integration

### VS Code Settings (`.vscode/settings.json`)
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  }
}
```

---

## Migration Checklist

When upgrading TypeScript versions:

1. Check [Breaking Changes](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes)
2. Run `npx tsc --noEmit` to find new errors
3. Update `tsconfig.json` with new options
4. Update dependencies (`@types/*`, `typescript`)
5. Test build and runtime

---

## Resources

- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [Strict Checks](https://www.typescriptlang.org/tsconfig#strict)
- [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)