// ==========================================
// INDEX SIGNATURES
// ==========================================

// ==========================================
// 1. BASIC INDEX SIGNATURES
// ==========================================

// String index signature - object with string keys
interface ISStringMap {
  [key: string]: string;
}

const isStringMap: ISStringMap = {
  name: "Alice",
  email: "alice@example.com",
  city: "NYC",
};

console.log("--- Basic String Index Signature ---");
console.log(isStringMap);
console.log(isStringMap["name"]); // "Alice"

// Number index signature - array-like objects
interface ISNumberMap {
  [index: number]: string;
}

const isNumberMap: ISNumberMap = {
  0: "zero",
  1: "one",
  2: "two",
};

console.log("\n--- Number Index Signature ---");
console.log(isNumberMap[1]); // "one"

// ==========================================
// 2. INDEX SIGNATURES WITH KNOWN PROPERTIES
// ==========================================

interface ISUserWithIndex {
  // Known properties
  id: number;
  name: string;

  // Index signature - additional properties
  [key: string]: string | number | undefined;
}

const isUser: ISUserWithIndex = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  // city: "NYC", // OK - string value
  // isActive: true, // Error - boolean not allowed
};

console.log("\n--- Index Signature with Known Properties ---");
console.log(isUser);

// ==========================================
// 3. READONLY INDEX SIGNATURES
// ==========================================

interface ISReadonlyStringMap {
  readonly [key: string]: string;
}

const isReadonlyMap: ISReadonlyStringMap = {
  a: "apple",
  b: "banana",
};

console.log("\n--- Readonly Index Signature ---");
console.log(isReadonlyMap["a"]);
// isReadonlyMap["c"] = "cherry"; // Error: readonly

// ==========================================
// 4. PRACTICAL: CHARACTER FREQUENCY COUNTER
// ==========================================

function isCountCharacters(str: string): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }

  return counts;
}

console.log("\n--- Character Frequency Counter ---");
console.log(isCountCharacters("hello world"));

// With explicit index signature type
interface ISCharCount {
  [char: string]: number;
}

function isCountChars(str: string): ISCharCount {
  const counts: ISCharCount = {};

  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }

  return counts;
}

console.log(isCountChars("typescript"));

// ==========================================
// 5. CACHE IMPLEMENTATION
// ==========================================

interface ISICache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
}

function isCreateCache<T>(): ISICache<T> {
  const store: Record<string, T> = {};

  return {
    get(key: string) {
      return store[key];
    },
    set(key: string, value: T) {
      store[key] = value;
    },
    has(key: string) {
      return key in store;
    },
    delete(key: string) {
      if (key in store) {
        delete store[key];
        return true;
      }
      return false;
    },
    clear() {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
}

console.log("\n--- Cache Implementation ---");
const isCache = isCreateCache<number>();
isCache.set("count", 42);
isCache.set("rate", 3.14);

console.log("count:", isCache.get("count"));
console.log("rate:", isCache.get("rate"));
console.log("has count:", isCache.has("count"));
console.log("has missing:", isCache.has("missing"));

isCache.delete("count");
console.log("after delete:", isCache.get("count"));

// ==========================================
// 6. DICTIONARY / LOOKUP TABLES
// ==========================================

// HTTP Status Codes
type ISHttpStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

interface ISStatusMessages {
  [code: number]: string;
}

const isHttpStatusMessages: ISStatusMessages = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

console.log("\n--- HTTP Status Lookup ---");
console.log(isHttpStatusMessages[200]);
console.log(isHttpStatusMessages[404]);

// With const assertion for exact keys
const isExactStatusMessages = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
} as const;

type ISExactStatusCode = keyof typeof isExactStatusMessages;
// 200 | 201 | 400 | 401 | 403 | 404 | 500

function isGetStatusMessage(code: ISExactStatusCode): string {
  return isExactStatusMessages[code];
}

console.log("Exact:", isGetStatusMessage(404));
// isGetStatusMessage(999); // Error!

// ==========================================
// 7. FORM VALIDATION ERRORS
// ==========================================

interface ISFormErrors {
  [fieldName: string]: string | undefined;
}

const isErrors: ISFormErrors = {
  email: "Invalid email format",
  password: "Password too short",
  // username: undefined, // OK - optional
};

console.log("\n--- Form Validation Errors ---");
console.log(isErrors);

function isHasErrors(errors: ISFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}

function isGetFirstError(errors: ISFormErrors): string | undefined {
  for (const error of Object.values(errors)) {
    if (error) return error;
  }
  return undefined;
}

console.log("Has errors:", isHasErrors(isErrors));
console.log("First error:", isGetFirstError(isErrors));

// Clear errors
isErrors.email = undefined;
console.log("After clear:", isHasErrors(isErrors));

// ==========================================
// 8. NESTED INDEX SIGNATURES
// ==========================================

// Multi-level object
interface ISNestedData {
  [category: string]: {
    [key: string]: number;
  };
}

const isSalesData: ISNestedData = {
  electronics: {
    phones: 150,
    laptops: 80,
    tablets: 45,
  },
  clothing: {
    shirts: 200,
    pants: 150,
    shoes: 100,
  },
};

console.log("\n--- Nested Index Signatures ---");
console.log("Electronics phones:", isSalesData.electronics?.phones);
console.log("Clothing shoes:", isSalesData.clothing?.shoes);

// Type-safe access
function isGetCategoryTotal(data: ISNestedData, category: string): number {
  const cat = data[category];
  if (!cat) return 0;
  return Object.values(cat).reduce((sum, val) => sum + val, 0);
}

console.log("Electronics total:", isGetCategoryTotal(isSalesData, "electronics"));

// ==========================================
// 9. RECORD<K, V> vs INDEX SIGNATURES
// ==========================================

// Record - more precise keys
type ISUserRole = "admin" | "user" | "guest";
type ISPermissions = Record<ISUserRole, string[]>;

const isPermissions: ISPermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

console.log("\n--- Record vs Index Signature ---");
console.log(isPermissions);

// Index signature - dynamic keys
interface ISDynamicPermissions {
  [role: string]: string[];
}

const isDynamicPerms: ISDynamicPermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
  moderator: ["read", "write", "ban"], // Extra key allowed
};

console.log(isDynamicPerms);

// ==========================================
// 10. INDEX SIGNATURES WITH SYMBOLS
// ==========================================

const isSym1 = Symbol("id");
const isSym2 = Symbol("name");

interface ISSymbolMap {
  [key: symbol]: string;
}

const isSymbolMap: ISSymbolMap = {
  [isSym1]: "123",
  [isSym2]: "Alice",
};

console.log("\n--- Symbol Index Signature ---");
console.log(isSymbolMap[isSym1]);

// ==========================================
// 11. MAPPED TYPES WITH INDEX SIGNATURES
// ==========================================

type ISStringKeys<T> = {
  [K in keyof T as K extends string ? K : never]: T[K];
};

interface ISMixed {
  name: string;
  age: number;
  123: boolean; // numeric key
}

type ISOnlyStringKeys = ISStringKeys<ISMixed>;
// { name: string; }

console.log("\n--- Mapped Types with Index Signatures ---");
const isMixed: ISMixed = { name: "Alice", age: 28, 123: true };
const isOnlyStrings: ISOnlyStringKeys = { name: "Alice", age: 28 };
console.log(isOnlyStrings);

// ==========================================
// 12. TEMPLATE LITERAL INDEX SIGNATURES (TS 4.4+)
// ==========================================

// Event handler map with template literal keys
// Note: Template literal index signatures only work for DECLARING types, not for implementing
// We use a regular index signature for the implementation
interface ISEventHandlers {
  [key: `on${string}`]: (data: any) => void;
}

const isHandlers: ISEventHandlers & {
  onClick: (data: any) => void;
  onHover: (data: any) => void;
  onCustomEvent: (data: any) => void;
} = {
  onClick: (data: any) => console.log("Click:", data),
  onHover: (data: any) => console.log("Hover:", data),
  onCustomEvent: (data: any) => console.log("Custom:", data),
};

console.log("\n--- Template Literal Index Signature ---");
isHandlers.onClick({ x: 10, y: 20 });
isHandlers.onHover({ element: "button" });
isHandlers.onCustomEvent({ foo: "bar" });

// ==========================================
// 13. CONFIGURATION OBJECTS
// ==========================================

interface ISAppConfig {
  // Required known properties
  apiUrl: string;
  timeout: number;

  // Optional index signature for feature flags
  [feature: `feature.${string}`]: boolean;
}

const isConfig: ISAppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  "feature.darkMode": true,
  "feature.notifications": false,
  "feature.beta": true,
};

console.log("\n--- Config with Template Literal Index ---");
console.log(isConfig);

// Helper to check features
function isFeatureEnabled(config: ISAppConfig, feature: string): boolean {
  return config[`feature.${feature}`] === true;
}

console.log("darkMode:", isFeatureEnabled(isConfig, "darkMode"));
console.log("beta:", isFeatureEnabled(isConfig, "beta"));

// ==========================================
// 14. TYPED EVENT EMITTER
// ==========================================

interface ISEventMap {
  [event: string]: (...args: any[]) => void;
}

class ISTypedEventEmitter<E extends ISEventMap> {
  private listeners: { [K in keyof E]?: E[K][] } = {};

  on<K extends keyof E>(event: K, listener: E[K]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof E>(event: K, listener: E[K]): void {
    const arr = this.listeners[event];
    if (arr) {
      const idx = arr.indexOf(listener);
      if (idx > -1) arr.splice(idx, 1);
    }
  }

  emit<K extends keyof E>(event: K, ...args: Parameters<E[K]>): void {
    this.listeners[event]?.forEach((listener) => listener(...args));
  }
}

interface ISMyEvents extends ISEventMap {
  login: (user: { id: string; name: string }) => void;
  logout: (userId: string) => void;
  error: (error: Error) => void;
}

const isEmitter = new ISTypedEventEmitter<ISMyEvents>();

console.log("\n--- Typed Event Emitter ---");
isEmitter.on("login", (user) => console.log("User logged in:", user.name));
isEmitter.on("logout", (userId) => console.log("User logged out:", userId));
isEmitter.on("error", (err) => console.log("Error:", err.message));

isEmitter.emit("login", { id: "u1", name: "Alice" });
isEmitter.emit("logout", "u1");
isEmitter.emit("error", new Error("Connection lost"));

// ==========================================
// 15. PARTIAL INDEX SIGNATURES
// ==========================================

// Only some keys have specific types, rest are generic
interface ISPartialIndex {
  id: string;
  name: string;
  [key: string]: string | number | undefined;
}

const isPartial: ISPartialIndex = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  age: 28,
};

console.log("\n--- Partial Index Signature ---");
console.log(isPartial);

// ==========================================
// 16. INDEX SIGNATURES WITH UNION VALUE TYPES
// ==========================================

type ISValueType = string | number | boolean | null;

interface ISFlexibleObject {
  [key: string]: ISValueType;
}

const isFlexible: ISFlexibleObject = {
  name: "Alice",
  age: 28,
  active: true,
  metadata: null,
};

console.log("\n--- Union Value Types ---");
console.log(isFlexible);

// ==========================================
// 17. NO INDEX SIGNATURE (Exact Types)
// ==========================================

// Using excess property checking for exact types
interface ISExactUser {
  id: number;
  name: string;
  email: string;
  // No index signature - exact shape required
}

function isCreateExactUser(user: ISExactUser): ISExactUser {
  return user;
}

// This works - exact match
const isExact1 = isCreateExactUser({ id: 1, name: "Alice", email: "alice@example.com" });

// This would error - excess property
// const exact2 = createExactUser({ id: 1, name: "Bob", email: "bob@example.com", age: 25 });

console.log("\n--- Exact Types (No Index Signature) ---");
console.log(isExact1);

// ==========================================
// 18. CONDITIONAL INDEX SIGNATURES
// ==========================================

type ISStringIndex<T> = T extends string ? { [key: string]: T } : never;

type ISStringMap2 = ISStringIndex<string>;    // { [key: string]: string }
type ISNumberMap2 = ISStringIndex<number>;    // never

console.log("\n--- Conditional Index Signatures ---");
const isSm: ISStringMap2 = { a: "hello", b: "world" };
console.log(isSm);