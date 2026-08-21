// ==========================================
// MAPPED TYPES & CONDITIONAL TYPES
// ==========================================

// ==========================================
// 1. BASIC MAPPED TYPES
// ==========================================

// Syntax: { [K in keyof T]: NewType }
// Iterates over all keys of T and transforms the value type

type MCTUser = {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

// Make all properties optional (like Partial)
type MCTPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required (like Required)
type MCTRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly (like Readonly)
type MCTReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Pick specific keys
type MCTPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific keys
type MCTOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

console.log("--- Basic Mapped Types ---");
type MCTPartialUser = MCTPartial<MCTUser>;
type MCTRequiredUser = MCTRequired<MCTPartialUser>;
type MCTReadonlyUser = MCTReadonly<MCTUser>;
type MCTUserPreview = MCTPick<MCTUser, "id" | "name" | "email">;
type MCTUserNoEmail = MCTOmit<MCTUser, "email">;

const mctPartial: MCTPartialUser = { name: "Alice" };
const mctPreview: MCTUserPreview = { id: 1, name: "Alice", email: "alice@example.com" };
console.log(mctPartial, mctPreview);

// ==========================================
// 2. KEY REMAPPING WITH `as`
// ==========================================

// TypeScript 4.1+: { [K in keyof T as NewKey]: T[K] }
// Can filter, transform, or add prefixes/suffixes to keys

// Remove "get" prefix from getter names
type MCTRemoveGetPrefix<T> = {
  [K in keyof T as K extends `get${infer R}` ? R : K]: T[K];
};

// Add "set" prefix for mutable properties
type MCTAddSetPrefix<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Filter only function properties
type MCTFunctionKeys<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// Filter only non-function properties
type MCTNonFunctionKeys<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

// Rename keys: snake_case to camelCase
type MCTSnakeToCamel<T> = {
  [K in keyof T as K extends string ? 
    K extends `${infer A}_${infer B}` 
      ? `${Lowercase<A>}${Capitalize<B>}` 
      : K 
    : K
  ]: T[K];
};

interface MCTUserData {
  user_id: number;
  user_name: string;
  user_email: string;
  is_active: boolean;
  getUserName(): string;
  getUserEmail(): string;
}

console.log("\n--- Key Remapping with `as` ---");
type MCTCamelCase = MCTSnakeToCamel<MCTUserData>;
// { userId: number; userName: string; userEmail: string; isActive: boolean; getUserName(): string; getUserEmail(): string; }

type MCTOnlyFunctions = MCTFunctionKeys<MCTUserData>;
// { getUserName(): string; getUserEmail(): string; }

type MCTOnlyData = MCTNonFunctionKeys<MCTUserData>;
// { user_id: number; user_name: string; user_email: string; is_active: boolean; }

// ==========================================
// 3. CONDITIONAL TYPES
// ==========================================

// Syntax: T extends U ? X : Y
// Evaluates to X if T is assignable to U, otherwise Y

// Basic conditional
type MCTIsString<T> = T extends string ? true : false;
type MCTTest1 = MCTIsString<string>;  // true
type MCTTest2 = MCTIsString<number>;  // false
type MCTTest3 = MCTIsString<string | number>;  // boolean (distributive)

console.log("\n--- Conditional Types ---");
type MCTIsArray<T> = T extends any[] ? true : false;
console.log("Is string[] array:", {} as MCTIsArray<string[]>);
console.log("Is string array:", {} as MCTIsArray<string>);

// Conditional with infer - extracting types
type MCTArrayElement<T> = T extends (infer U)[] ? U : never;
type MCTPromiseValue<T> = T extends Promise<infer U> ? U : never;
type MCTFunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type MCTFunctionArgs<T> = T extends (...args: infer A) => any ? A : never;

type MCTElement = MCTArrayElement<string[]>;  // string
type MCTResolved = MCTPromiseValue<Promise<number>>;  // number
type MCTReturn = MCTFunctionReturn<() => string>;  // string
type MCTArgs = MCTFunctionArgs<(a: number, b: string) => void>;  // [number, string]

console.log("Array element:", {} as MCTElement);
console.log("Promise value:", {} as MCTResolved);
console.log("Function return:", {} as MCTReturn);
console.log("Function args:", {} as MCTArgs);

// ==========================================
// 4. DISTRIBUTIVE CONDITIONAL TYPES
// ==========================================

// When T is a naked type parameter, conditional types distribute over unions
type MCTToArray<T> = T extends any ? T[] : never;
// string | number => string[] | number[]

type MCTDistributed = MCTToArray<string | number>;
// string[] | number[] (not (string | number)[])

type MCTNonDistributed<T> = [T] extends [any] ? T[] : never;
// string | number => (string | number)[]

console.log("\n--- Distributive Conditional Types ---");
type MCTDist = MCTToArray<string | number>;
type MCTNonDist = MCTNonDistributed<string | number>;

// Practical: Exclude null/undefined from union
type MCTNonNullable<T> = T extends null | undefined ? never : T;
type MCTClean = MCTNonNullable<string | number | null | undefined>;  // string | number

// Filter union by type
type MCTFilterByType<T, U> = T extends U ? T : never;
type MCTOnlyStrings = MCTFilterByType<string | number | boolean | string[], string>;
// string (distributes over union)

// ==========================================
// 5. PRACTICAL UTILITY TYPES WITH CONDITIONAL
// ==========================================

// DeepReadonly - recursively make all properties readonly
type MCTDeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? MCTDeepReadonly<T[K]> : T[K];
};

// DeepPartial - recursively make all properties optional
type MCTDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? MCTDeepPartial<T[K]> : T[K];
};

// DeepRequired - recursively make all properties required
type MCTDeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? MCTDeepRequired<T[K]> : T[K];
};

// Mutable - remove readonly
type MCTMutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Flatten - flatten nested objects one level
type MCTFlatten<T> = {
  [K in keyof T]: T[K] extends object ? never : T[K];
};

// Get all property paths as strings
type MCTPaths<T> = {
  [K in keyof T]: T[K] extends object 
    ? `${string & K}.${MCTPaths<T[K]>}` 
    : string & K;
}[keyof T];

interface MCTNestedUser {
  id: number;
  profile: {
    name: string;
    address: {
      city: string;
      country: string;
    };
  };
  tags: string[];
}

console.log("\n--- Practical Deep Types ---");
type MCTDeepPartialUser = MCTDeepPartial<MCTNestedUser>;
type MCTUserPaths = MCTPaths<MCTNestedUser>;

const mctDeepPartial: MCTDeepPartialUser = {
  profile: {
    name: "Alice",
    address: {
      city: "NYC"
    }
  }
};
console.log(mctDeepPartial);

// ==========================================
// 6. FUNCTION TYPES WITH INFER
// ==========================================

// Extract parameter types
type MCTParameters<T> = T extends (...args: infer P) => any ? P : never;
// Extract return type
type MCTReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// Extract this type
type MCTThisType<T> = T extends (this: infer T, ...args: any[]) => any ? T : never;
// Extract constructor parameters
type MCTConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;
// Extract instance type
type MCTInstanceType<T> = T extends new (...args: any[]) => infer I ? I : never;

function mctAdd(a: number, b: number): number { return a + b; }
class MCTPoint {
  constructor(public x: number, public y: number) {}
}

console.log("\n--- Function Types with infer ---");
type MCTAddParams = MCTParameters<typeof mctAdd>;  // [number, number]
type MCTAddReturn = MCTReturnType<typeof mctAdd>;  // number
type MCTPointCtorParams = MCTConstructorParameters<typeof MCTPoint>;  // [number, number]
type MCTPointInstance = MCTInstanceType<typeof MCTPoint>;  // MCTPoint

// ==========================================
// 7. ADVANCED: TEMPLATE LITERAL WITH INFER
// ==========================================

// Parse event names
type MCTEventName<T> = T extends `on${infer E}` ? E : never;
type MCTOnClick = MCTEventName<"onClick">;  // "Click"
type MCTOnChange = MCTEventName<"onChange">;  // "Change"

// Parse CSS properties
type MCTCSSProperty<T> = T extends `${infer Prefix}-${infer Suffix}` 
  ? { prefix: Prefix; suffix: Suffix } 
  : never;

type MCTMarginTop = MCTCSSProperty<"margin-top">;
// { prefix: "margin"; suffix: "top" }

// ==========================================
// 8. CONDITIONAL TYPE CONSTRAINTS
// ==========================================

// Constrained conditional types
type MCTPickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface MCTConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  enableCache: boolean;
  onError: (err: Error) => void;
}

console.log("\n--- Pick By Type ---");
type MCTStringConfig = MCTPickByType<MCTConfig, string>;  // { apiUrl: string }
type MCTNumberConfig = MCTPickByType<MCTConfig, number>;  // { timeout: number; retries: number }
type MCTFunctionConfig = MCTPickByType<MCTConfig, Function>;  // { onError: (err: Error) => void }

// ==========================================
// 9. RECURSIVE TYPES
// ==========================================

// JSON value type
type MCTJSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | MCTJSONValue[] 
  | { [key: string]: MCTJSONValue };

// Deep flatten array
type MCTFlattenArray<T> = T extends (infer U)[] 
  ? U extends any[] 
    ? MCTFlattenArray<U> 
    : U 
  : T;

type MCTNestedArray = number[][][];
type MCTFlat = MCTFlattenArray<MCTNestedArray>;  // number

console.log("\n--- Recursive Types ---");
type MCTFlatResult = MCTFlat;

// ==========================================
// 10. TYPE-LEVEL PROGRAMMING: IF/ELSE
// ==========================================

type MCTIf<C, T, F> = C extends true ? T : F;
type MCTEquals<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? true : false;

// Type-level assertion
type MCTAssert<T extends true> = T;

// Check if type extends another
type MCTExtends<T, U> = T extends U ? true : false;

console.log("\n--- Type-Level Programming ---");
type MCTCheck1 = MCTIf<true, "yes", "no">;  // "yes"
type MCTCheck2 = MCTExtends<string, string | number>;  // true
type MCTCheck3 = MCTEquals<string, string>;  // true

// ==========================================
// 11. PRACTICAL: API RESPONSE TRANSFORMATION
// ==========================================

interface MCTApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Transform API response to just data
type MCTUnwrapResponse<T> = T extends MCTApiResponse<infer U> ? U : T;

// Transform union of responses
type MCTResponseData<T> = T extends MCTApiResponse<any> ? T["data"] : never;

type MCTUserResponse = MCTApiResponse<{ id: number; name: string }>;
type MCTUnwrappedUser = MCTUnwrapResponse<MCTUserResponse>;  // { id: number; name: string }

console.log("\n--- API Response Transformation ---");
const mctUserData: MCTUnwrappedUser = { id: 1, name: "Alice" };
console.log(mctUserData);

// ==========================================
// 12. NEVER IN CONDITIONAL TYPES
// ==========================================

// Exhaustiveness checking
type MCTAssertNever<T> = T extends never ? true : false;

// In mapped types, never keys are omitted
type MCTOptionalKeys<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};

type MCTRequiredKeys<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

interface MCTMixed {
  required: string;
  optional?: number;
}

console.log("\n--- Optional/Required Keys ---");
type MCTOpt = MCTOptionalKeys<MCTMixed>;  // { optional?: number }
type MCTReq = MCTRequiredKeys<MCTMixed>;  // { required: string }

// ==========================================
// 13. PRACTICAL: FORM FIELD TRANSFORMATION
// ==========================================

// Use a concrete type instead of interface with index signature
type MCTFormField = {
  type: "string" | "number" | "boolean";
  required: boolean;
  default?: any;
};

type MCTFormConfig = Record<string, MCTFormField>;

// Transform to form values type
type MCTFormValues<T extends MCTFormConfig> = {
  [K in keyof T]: T[K]["type"] extends "string" ? string
    : T[K]["type"] extends "number" ? number
    : T[K]["type"] extends "boolean" ? boolean
    : never;
};

type MCTMyFormConfig = {
  username: { type: "string"; required: true; default: "" };
  age: { type: "number"; required: false; default: 18 };
  active: { type: "boolean"; required: true; default: true };
};

console.log("\n--- Form Field Transformation ---");
type MCTMyFormValues = MCTFormValues<MCTMyFormConfig>;
// { username: string; age: number; active: boolean; }

const mctForm: MCTMyFormValues = {
  username: "alice",
  age: 25,
  active: true
};
console.log(mctForm);