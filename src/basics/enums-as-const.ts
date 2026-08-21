// ==========================================
// ENUMS & AS CONST
// ==========================================

// ==========================================
// 1. TRADITIONAL ENUMS
// ==========================================

// Numeric enum (default)
enum EnumDirection {
  Up = 1,
  Down,
  Left,
  Right,
}

console.log("--- Numeric Enum ---");
console.log(EnumDirection.Up);     // 1
console.log(EnumDirection.Down);   // 2
console.log(EnumDirection.Left);   // 3
console.log(EnumDirection.Right);  // 4
console.log(EnumDirection[1]);     // "Up" (reverse mapping)

// String enum
enum EnumHttpStatus {
  OK = "OK",
  CREATED = "CREATED",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

console.log("\n--- String Enum ---");
console.log(EnumHttpStatus.OK);
console.log(EnumHttpStatus.NOT_FOUND);

// Heterogeneous enum (avoid)
enum EnumMixed {
  No = 0,
  Yes = "YES",
}

// Const enum (fully inlined at compile time)
const enum EnumLogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

console.log("\n--- Const Enum (inlined) ---");
console.log(EnumLogLevel.INFO);  // Inlined as 1 in compiled JS

// ==========================================
// 2. PROBLEMS WITH ENUMS IN MODERN TS
// ==========================================

/*
PROBLEMS WITH ENUMS:
1. Node.js type-stripping (--experimental-strip-types) does NOT support enums
   - enum becomes `const enum` in output but still emits runtime code
   - Need tsx/tsc to run, not `node file.ts` directly

2. String enums don't have reverse mapping
3. Enum members are not types (can't use as type directly)
4. const enum inlining can cause issues with separate compilation

MODERN ALTERNATIVE: as const + union types
*/

// ==========================================
// 3. MODERN APPROACH: as const + UNION
// ==========================================

// Direction as const object
const EnumDirectionConst = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
} as const;

type EnumDirectionType = (typeof EnumDirectionConst)[keyof typeof EnumDirectionConst];
// type EnumDirectionType = "UP" | "DOWN" | "LEFT" | "RIGHT"

console.log("\n--- as const + Union ---");
console.log(EnumDirectionConst.Up);
console.log(EnumDirectionConst.Down);

function enumMove(dir: EnumDirectionType) {
  console.log(`Moving ${dir}`);
}

enumMove(EnumDirectionConst.Up);
enumMove("LEFT");  // Also works with literal

// HttpStatus as const
const EnumHttpStatusConst = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

type EnumHttpStatusCode = (typeof EnumHttpStatusConst)[keyof typeof EnumHttpStatusConst];
// type EnumHttpStatusCode = 200 | 201 | 400 | 401 | 404 | 500

console.log("\n--- Numeric as const ---");
console.log(EnumHttpStatusConst.OK);
console.log(EnumHttpStatusConst.NOT_FOUND);

function enumHandleResponse(status: EnumHttpStatusCode) {
  if (status >= 400) {
    console.log(`Error: ${status}`);
  } else {
    console.log(`Success: ${status}`);
  }
}

enumHandleResponse(EnumHttpStatusConst.OK);
enumHandleResponse(404);

// ==========================================
// 4. COMPARISON: ENUM vs as const
// ==========================================

// Enum - runtime object exists
enum EnumColor {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// as const - only type info, minimal runtime
const EnumConstColor = {
  Red: "RED",
  Green: "GREEN",
  Blue: "BLUE",
} as const;

console.log("\n--- Runtime Comparison ---");
console.log("Enum object:", EnumColor);
console.log("Const object:", EnumConstColor);

// Type-level comparison
type EnumColorType = EnumColor;           // Works but limited
type EnumConstColorType = typeof EnumConstColor[keyof typeof EnumConstColor];  // "RED" | "GREEN" | "BLUE"

// ==========================================
// 5. PRACTICAL PATTERNS WITH as const
// ==========================================

// Config object with strict typing
const EnumAppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  features: {
    darkMode: true,
    notifications: false,
    beta: true,
  },
} as const;

type EnumAppConfigType = typeof EnumAppConfig;
// Inferred as:
// {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
//   readonly features: {
//     readonly darkMode: true;
//     readonly notifications: false;
//     readonly beta: true;
//   }
// }

console.log("\n--- Config with as const ---");
console.log(EnumAppConfig.apiUrl);
console.log(EnumAppConfig.features.darkMode);

// Array as const
const EnumSupportedLanguages = ["en", "es", "fr", "de", "ja"] as const;
type EnumLanguage = (typeof EnumSupportedLanguages)[number];
// type EnumLanguage = "en" | "es" | "fr" | "de" | "ja"

function enumSetLanguage(lang: EnumLanguage) {
  console.log(`Language set to: ${lang}`);
}

console.log("\n--- Array as const ---");
enumSetLanguage("en");
enumSetLanguage("ja");
// enumSetLanguage("zh"); // Error: not in union

// Tuple as const
const EnumRGB = [255, 128, 0] as const;
type EnumRGBTuple = typeof EnumRGB;
// type EnumRGBTuple = readonly [255, 128, 0]

console.log("\n--- Tuple as const ---");
console.log(EnumRGB);

// Object with methods (as const on object only affects properties)
const EnumUserRole = {
  Admin: "ADMIN",
  User: "USER",
  Guest: "GUEST",
} as const;

type EnumUserRoleType = (typeof EnumUserRole)[keyof typeof EnumUserRole];

function enumCheckPermission(role: EnumUserRoleType): boolean {
  return role === EnumUserRole.Admin;
}

console.log("\n--- Role Check ---");
console.log(enumCheckPermission(EnumUserRole.Admin));
console.log(enumCheckPermission(EnumUserRole.User));

// ==========================================
// 6. WHEN TO USE WHICH
// ==========================================

/*
USE ENUM WHEN:
- Need bitwise flags (flags enum)
- Working with legacy code that expects enum
- Need runtime enum object for iteration

USE as const + UNION WHEN:
- Modern TypeScript projects
- Running with Node type-stripping (node file.ts)
- Want precise literal types
- Want tree-shakable, minimal runtime code
- Need better type inference
*/

// Bitwise flags example (one case where enum shines)
enum EnumPermission {
  Read = 1 << 0,     // 1
  Write = 1 << 1,    // 2
  Execute = 1 << 2,  // 4
  Admin = Read | Write | Execute,  // 7
}

function enumHasPermission(userPerm: EnumPermission, check: EnumPermission): boolean {
  return (userPerm & check) === check;
}

console.log("\n--- Bitwise Flags (Enum Use Case) ---");
const enumUserPerm = EnumPermission.Read | EnumPermission.Write;
console.log("Has Read:", enumHasPermission(enumUserPerm, EnumPermission.Read));
console.log("Has Execute:", enumHasPermission(enumUserPerm, EnumPermission.Execute));

// Modern alternative with as const (but no bitwise operators on types)
const EnumPermConst = {
  Read: 1,
  Write: 2,
  Execute: 4,
} as const;

type EnumPermValue = (typeof EnumPermConst)[keyof typeof EnumPermConst];