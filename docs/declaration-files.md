# Declaration Files (.d.ts) & `declare`

This document explains TypeScript declaration file concepts, syntax, and patterns. Actual `.d.ts` files are separate files (not `.ts` files) that provide type information for JavaScript code.

---

## 1. Basic Declaration File Structure

**File: `types/global.d.ts`**

```typescript
// Global type declarations

// Declare global variables
declare const MY_GLOBAL_CONST: string;
declare let myGlobalVar: number;
declare function myGlobalFunction(): void;

// Declare global interfaces
interface Window {
  myCustomProperty: string;
}

// Declare module augmentations
declare module "express" {
  interface Request {
    user?: User;
  }
}
```

---

## 2. Ambient Declarations with `declare`

The `declare` keyword tells TypeScript "this exists at runtime but I won't provide implementation." Used for external libraries, globals, or polyfills.

```typescript
// Declare a global variable (e.g., from a script tag)
declare const VERSION: string;
declare const __DEV__: boolean;

// Declare a global function
declare function fetchPolyfill(url: string, options?: RequestInit): Promise<Response>;

// Declare a class (from external library)
declare class ExternalLibrary {
  constructor(options: { apiKey: string });
  getData(): Promise<any>;
  setOption(key: string, value: any): void;
}

// Declare an enum (for ambient enums)
declare enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

// Declare a namespace (for legacy libraries)
declare namespace MyLibrary {
  function init(config: { apiKey: string }): void;
  function getVersion(): string;
  interface Config {
    apiKey: string;
    timeout?: number;
  }
}
```

---

## 3. Module Declarations

**File: `types/external-lib.d.ts`**

Declare types for a module without type definitions:

```typescript
declare module "external-lib" {
  // Export types
  export interface User {
    id: string;
    name: string;
  }
  
  export function getUser(id: string): Promise<User>;
  export function createUser(data: Omit<User, "id">): Promise<User>;
  
  export const VERSION: string;
  export default function init(config: { apiKey: string }): void;
}
```

---

## 4. Module Augmentation

**File: `types/express.d.ts`**

Extend existing module types:

```typescript
// Augment Express Request interface
declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      roles: string[];
    };
    sessionId?: string;
  }
  
  interface Response {
    success<T>(data: T): void;
    error(message: string, code?: number): void;
  }
}

// Augment Node.js globals
declare module "node:http" {
  interface IncomingMessage {
    user?: User;
  }
}
```

---

## 5. Global Augmentation

**File: `types/global.d.ts`**

Add types to global scope:

```typescript
declare global {
  interface Window {
    __APP_VERSION__: string;
    __BUILD_TIME__: string;
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
  
  interface String {
    toTitleCase(): string;
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      JWT_SECRET: string;
      API_KEY: string;
    }
  }
}
```

After global augmentation, you can use:
- `window.__APP_VERSION__`
- `process.env.DATABASE_URL`
- `"hello".toTitleCase()`

---

## 6. Declare Module for JS Libraries

**File: `types/lodash.d.ts`** (example)

```typescript
declare module "lodash" {
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: { leading?: boolean; trailing?: boolean }
  ): T & { cancel(): void; flush(): void };
  
  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T & { cancel(): void };
  
  export function cloneDeep<T>(value: T): T;
  
  export interface LoDashStatic {
    debounce: typeof debounce;
    throttle: typeof throttle;
    cloneDeep: typeof cloneDeep;
  }
  
  const _: LoDashStatic;
  export default _;
}
```

---

## 7. Types for Polyfills

**File: `types/polyfills.d.ts`**

Declare polyfilled methods:

```typescript
interface Array<T> {
  // Polyfill for Array.prototype.flat
  flat(depth?: number): any[];
  
  // Polyfill for Array.prototype.flatMap
  flatMap<U>(callback: (value: T, index: number, array: T[]) => U[], thisArg?: any): U[];
}

interface Promise<T> {
  // Polyfill for Promise.prototype.finally
  finally(onfinally?: () => void): Promise<T>;
}

interface Object {
  // Polyfill for Object.fromEntries
  fromEntries(entries: Iterable<[string, any]>): any;
}
```

---

## 8. Declare Namespace for Legacy Libs

**File: `types/jquery.d.ts`**

For libraries that expose globals (jQuery, moment, etc.):

```typescript
declare namespace JQuery {
  interface Static {
    (selector: string): JQuery;
    ajax(settings: AjaxSettings): jqXHR;
    get(url: string, data?: any, success?: Function, dataType?: string): jqXHR;
    post(url: string, data?: any, success?: Function, dataType?: string): jqXHR;
  }
  
  interface AjaxSettings {
    url: string;
    method?: string;
    data?: any;
    dataType?: "json" | "xml" | "html" | "text";
    success?: (data: any, textStatus: string, jqXHR: jqXHR) => void;
    error?: (jqXHR: jqXHR, textStatus: string, errorThrown: string) => void;
  }
  
  interface jqXHR {
    done(callback: (data: any, textStatus: string, jqXHR: jqXHR) => void): jqXHR;
    fail(callback: (jqXHR: jqXHR, textStatus: string, errorThrown: string) => void): jqXHR;
    always(callback: (data: any | jqXHR, textStatus: string, jqXHR: jqXHR | string) => void): jqXHR;
  }
}

declare const $: JQuery.Static;
declare const jQuery: JQuery.Static;
```

---

## 9. Triple-Slash References

**File: `src/types/index.d.ts`**

Reference other declaration files:

```typescript
/// <reference path="./global.d.ts" />
/// <reference path="./express.d.ts" />
/// <reference path="./polyfills.d.ts" />
/// <reference types="node" />
/// <reference types="jest" />
/// <reference lib="es2020" />
/// <reference lib="dom" />
```

---

## 10. Declare for CSS/Asset Modules

**File: `types/assets.d.ts`**

Declare modules for non-TypeScript imports:

```typescript
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.json" {
  const value: any;
  export default value;
}
```

---

## 11. Declare for Vue/JSX

**File: `types/vue.d.ts`**

```typescript
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// JSX Intrinsic Elements for Vue
declare namespace JSX {
  interface IntrinsicElements {
    div: HTMLAttributes<HTMLDivElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    // ... all HTML elements
  }
}
```

---

## 12. Publishing Types to DefinitelyTyped

**Package structure for DefinitelyTyped:**

```
types/my-lib/
├── index.d.ts          # Main declaration file
├── package.json        # Package config
└── tsconfig.json       # TypeScript config
```

**File: `types/my-lib/index.d.ts`**

```typescript
declare module "my-lib" {
  export interface Config {
    apiKey: string;
    timeout?: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export function init(config: Config): void;
  export function getUser(id: string): Promise<User>;
  export function createUser(data: Omit<User, "id">): Promise<User>;
  
  export class Client {
    constructor(config: Config);
    getUser(id: string): Promise<User>;
    createUser(data: Omit<User, "id">): Promise<User>;
  }
  
  export default { init, getUser, createUser, Client };
}
```

**File: `types/my-lib/package.json`**

```json
{
  "name": "@types/my-lib",
  "version": "1.0.0",
  "description": "TypeScript definitions for my-lib",
  "main": "",
  "types": "index.d.ts",
  "scripts": {
    "test": "tsc --noEmit"
  },
  "dependencies": {},
  "peerDependencies": {}
}
```

---

## 13. Module Resolution with Paths

**In `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@types/*": ["types/*"],
      "my-lib": ["types/my-lib/index.d.ts"]
    },
    "typeRoots": ["./types", "./node_modules/@types"]
  }
}
```

Then use:
```typescript
import { User } from "my-lib";
// Or with verbatimModuleSyntax:
import type { User } from "my-lib";
```

---

## 14. Conditional Type Exports

**Package.json exports with types:**

```json
{
  "name": "my-lib",
  "version": "1.0.0",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./client": {
      "types": "./dist/client.d.ts",
      "import": "./dist/client.mjs",
      "require": "./dist/client.js"
    }
  },
  "types": "./dist/index.d.ts"
}
```

---

## 15. Declare with Generics

**File: `types/api.d.ts`**

```typescript
declare module "api-client" {
  export interface ApiResponse<T> {
    data: T;
    status: number;
    headers: Record<string, string>;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }
  
  export interface RequestConfig<T = any> {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: T;
    params?: Record<string, any>;
    headers?: Record<string, string>;
  }
  
  export function request<T>(config: RequestConfig): Promise<ApiResponse<T>>;
  export function get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  export function post<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  export function put<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  export function del<T>(url: string): Promise<ApiResponse<T>>;
  
  export class ApiClient {
    constructor(baseURL: string);
    request<T>(config: RequestConfig): Promise<ApiResponse<T>>;
    get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    post<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  }
}
```

---

## 16. Declare for Testing Libraries

**File: `types/testing.d.ts`**

```typescript
declare module "vitest" {
  interface Assertion<T = any> {
    toBeTypeOf(type: string): void;
    toEqualTypeOf<U>(): void;
  }
  
  interface AsyncAssertion<T = any> {
    toBeTypeOf(type: string): void;
    toEqualTypeOf<U>(): void;
  }
}

declare module "@testing-library/react" {
  interface RenderOptions<Q extends Queries> {
    wrapper?: React.ComponentType;
  }
}
```

---

## 17. Declare for Environment Variables

**File: `types/env.d.ts`**

```typescript
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // Required
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    JWT_SECRET: string;
    
    // Optional
    PORT?: string;
    REDIS_URL?: string;
    S3_BUCKET?: string;
    AWS_REGION?: string;
    
    // Feature flags
    FEATURE_NEW_UI?: "true" | "false";
    FEATURE_BETA_API?: "true" | "false";
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<string, string | undefined> {}
  }
}
```

---

## 18. Practical: Project Declaration Structure

**Recommended project structure:**

```
project/
├── src/
│   ├── types/
│   │   ├── global.d.ts          # Global types
│   │   ├── env.d.ts             # Environment variables
│   │   ├── express.d.ts         # Express augmentation
│   │   ├── assets.d.ts          # CSS/images/JSON imports
│   │   └── polyfills.d.ts       # Polyfill types
│   └── ...
├── types/                       # External library types
│   ├── external-lib.d.ts
│   └── legacy-lib.d.ts
├── tsconfig.json
└── package.json
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "typeRoots": ["./src/types", "./types", "./node_modules/@types"],
    "types": ["node", "jest", "vitest/globals"]
  }
}
```

---

## 19. Common Patterns & Best Practices

### Best Practices:

1. Use `declare module` for external libraries
2. Use `declare global` for global augmentations
3. Use `declare namespace` for legacy global libraries
4. Use `/// <reference>` for including other `.d.ts` files
5. Put project-specific types in `src/types/`
6. Put external library types in `types/`
7. Use `export type` / `import type` for type-only imports
8. Prefer `interface` over `type` for declaration merging
9. Document with JSDoc comments for IDE support
10. Test declarations with `tsc --noEmit`

### Common Patterns:

```typescript
// Extend Express Request
declare module "express" {
  interface Request {
    user?: User;
  }
}

// Extend Window
declare global {
  interface Window {
    myApp: MyApp;
  }
}

// Type for CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Type for JSON imports
declare module "*.json" {
  const value: any;
  export default value;
}

// Type for images
declare module "*.png" {
  const src: string;
  export default src;
}
```