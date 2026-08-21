// ==========================================
// TEMPLATE LITERAL TYPES
// ==========================================

// ==========================================
// 1. BASIC SYNTAX
// ==========================================

// Template literal types use backticks and ${} placeholders
// They create union types from string literal combinations

type TLTEventName = `on${"Click" | "Change" | "Submit" | "Focus"}`;
// "onClick" | "onChange" | "onSubmit" | "onFocus"

type TLTCSSProperty = `margin${"" | "Top" | "Right" | "Bottom" | "Left"}`;
// "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft"

type TLTPaddingProperty = `padding${"-"}${"top" | "right" | "bottom" | "left"}`;
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

console.log("--- Basic Template Literal Types ---");
const tltEvent: TLTEventName = "onClick";
const tltCSS: TLTCSSProperty = "marginTop";
const tltPadding: TLTPaddingProperty = "padding-left";
console.log(tltEvent, tltCSS, tltPadding);

// ==========================================
// 2. COMBINING MULTIPLE UNIONS
// ==========================================

type TLTHttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type TLTApiVersion = "v1" | "v2" | "v3";
type TLTResource = "users" | "posts" | "comments";

// Full API route type
type TLTAPIRoute = `/api/${TLTApiVersion}/${TLTResource}`;
// "/api/v1/users" | "/api/v1/posts" | ... | "/api/v3/comments"

type TLTAPIRouteWithMethod = `${TLTHttpMethod} /api/${TLTApiVersion}/${TLTResource}`;
// "GET /api/v1/users" | "POST /api/v1/users" | ...

console.log("\n--- Combining Multiple Unions ---");
const tltRoute: TLTAPIRoute = "/api/v1/users";
const tltRouteMethod: TLTAPIRouteWithMethod = "GET /api/v2/posts";
console.log(tltRoute, tltRouteMethod);

// ==========================================
// 3. INFERENCE WITH `infer` IN TEMPLATE LITERALS
// ==========================================

// Extract parts from template literal types
type TLTExtractEvent<T> = T extends `on${infer E}` ? E : never;
type TLTExtractMethod<T> = T extends `${infer M} /${string}` ? M : never;
type TLTExtractVersion<T> = T extends `/api/${infer V}/${string}` ? V : never;
type TLTExtractResource<T> = T extends `/api/${string}/${infer R}` ? R : never;

type TLTClick = TLTExtractEvent<"onClick">;  // "Click"
type TLTGet = TLTExtractMethod<"GET /api/v1/users">;  // "GET"
type TLTV1 = TLTExtractVersion<"/api/v1/users">;  // "v1"
type TLTUsers = TLTExtractResource<"/api/v2/posts">;  // "posts"

console.log("\n--- Inference with infer ---");
console.log("Event:", {} as TLTClick);
console.log("Method:", {} as TLTGet);
console.log("Version:", {} as TLTV1);
console.log("Resource:", {} as TLTUsers);

// ==========================================
// 4. PRACTICAL: EVENT HANDLER TYPES
// ==========================================

type TLTElementEvents = {
  click: MouseEvent;
  change: Event;
  submit: SubmitEvent;
  focus: FocusEvent;
  blur: FocusEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
};

// Generate handler property names
type TLTHandlerNames = {
  [K in keyof TLTElementEvents as `on${Capitalize<K>}`]: (e: TLTElementEvents[K]) => void;
};
// { onClick: (e: MouseEvent) => void; onChange: (e: Event) => void; ... }

console.log("\n--- Event Handler Types ---");
type TLTHandlers = TLTHandlerNames;

// ==========================================
// 5. CSS-IN-JS PROPERTY TYPES
// ==========================================

type TLTDirections = "Top" | "Right" | "Bottom" | "Left";
type TLTSides = "X" | "Y";

// Margin, padding, border properties
type TLTMargin = `margin${"" | TLTDirections}`;
// "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft"

type TLTPadding = `padding${"" | TLTDirections}`;
// "padding" | "paddingTop" | ...

type TLTCSSPosition = `border${"" | TLTDirections}${"" | "Width" | "Style" | "Color"}`;
// "border" | "borderTop" | "borderTopWidth" | "borderTopStyle" | "borderTopColor" | ...

// Flexbox properties
type TLTFlexDirection = `flex${"" | "Direction" | "Wrap" | "Grow" | "Shrink" | "Basis"}`;
// "flex" | "flexDirection" | "flexWrap" | "flexGrow" | "flexShrink" | "flexBasis"

console.log("\n--- CSS-in-JS Property Types ---");
type TLTCSSProps = TLTMargin | TLTPadding | TLTCSSPosition | TLTFlexDirection;

// ==========================================
// 6. DATABASE QUERY BUILDER TYPES
// ==========================================

type TLTSQLKeyword = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type TLTTable = "users" | "posts" | "comments" | "orders";
type TLTColumn = "id" | "name" | "email" | "created_at" | "updated_at";

// Simple query types
type TLTSelectQuery = `SELECT ${TLTColumn} FROM ${TLTTable}`;
// "SELECT id FROM users" | "SELECT name FROM users" | ...

type TLTInsertQuery = `INSERT INTO ${TLTTable} (${TLTColumn}) VALUES (?)`;
// "INSERT INTO users (id) VALUES (?)" | ...

console.log("\n--- Database Query Builder ---");
type TLTQuery = TLTSelectQuery | TLTInsertQuery;

// ==========================================
// 7. I18N / LOCALIZATION KEYS
// ==========================================

type TLTLocale = "en" | "es" | "fr" | "de" | "ja";
type TLTNamespace = "common" | "auth" | "dashboard" | "settings";
type TLTKey = "welcome" | "login" | "logout" | "save" | "cancel" | "delete";

type TLTTranslationKey = `${TLTLocale}.${TLTNamespace}.${TLTKey}`;
// "en.common.welcome" | "en.common.login" | ... | "ja.settings.delete"

type TLTInterpolatedKey = `{{${TLTTranslationKey}}}`;
// "{{en.common.welcome}}" | "{{en.common.login}}" | ...

console.log("\n--- I18n Translation Keys ---");
type TLTKeyExample = TLTTranslationKey;

// ==========================================
// 8. RECURSIVE TEMPLATE LITERALS
// ==========================================

// Nested object paths
type TLTObjectPath<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? TLTObjectPath<T[K], `${Prefix}${string & K}.`>
    : `${Prefix}${string & K}`
}[keyof T];

interface TLTUserProfile {
  name: string;
  address: {
    street: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  settings: {
    theme: string;
    notifications: boolean;
  };
}

console.log("\n--- Recursive Template Literals ---");
type TLTUserPaths = TLTObjectPath<TLTUserProfile>;
// "name" | "address.street" | "address.city" | "address.coordinates.lat" | "address.coordinates.lng" | "settings.theme" | "settings.notifications"

// ==========================================
// 9. PERMISSION / RBAC TYPES
// ==========================================

type TLTResourceType = "user" | "post" | "comment" | "file";
type TLTAction = "create" | "read" | "update" | "delete" | "list";
type TLTRole = "admin" | "editor" | "viewer" | "guest";

// Permission string format: "resource:action"
type TLTPermission = `${TLTResourceType}:${TLTAction}`;
// "user:create" | "user:read" | ... | "file:delete"

// Role-based permissions
type TLTRolePermissions = {
  [R in TLTRole]: TLTPermission[];
};

console.log("\n--- RBAC Permission Types ---");
type TLTPerm = TLTPermission;

// ==========================================
// 10. CONFIGURATION KEYS
// ==========================================

type TLTConfigSection = "database" | "cache" | "auth" | "logging" | "email";
type TLTConfigKey = "host" | "port" | "username" | "password" | "enabled" | "level";

type TLTConfigPath = `${TLTConfigSection}.${TLTConfigKey}`;
// "database.host" | "database.port" | ... | "email.level"

type TLTEnvConfigPath = `config.${TLTConfigPath}`;
// "config.database.host" | "config.database.port" | ...

console.log("\n--- Configuration Keys ---");
type TLTConfig = TLTConfigPath;

// ==========================================
// 11. TEMPLATE LITERAL WITH MAPPED TYPES
// ==========================================

// Generate getter/setter pairs
type TLTGenerateAccessors<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface TLTUser {
  name: string;
  age: number;
  email: string;
}

console.log("\n--- Generate Accessors ---");
type TLTAccessors = TLTGenerateAccessors<TLTUser>;
// { getName: () => string; getAge: () => number; getEmail: () => string; 
//   setName: (value: string) => void; setAge: (value: number) => void; setEmail: (value: string) => void; }

// Create event emitter types
type TLTEventEmitter<T extends Record<string, any>> = {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
};

// Prefix events with "on"
type TLTPrefixedEvents<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (data: T[K]) => void;
};

interface TLTAppEvents {
  login: { userId: string };
  logout: { userId: string };
  error: { message: string };
}

console.log("\n--- Prefixed Events ---");
type TLTPrefixed = TLTPrefixedEvents<TLTAppEvents>;
// { onLogin: (data: { userId: string }) => void; onLogout: ...; onError: ... }

// ==========================================
// 12. PARSE QUERY STRING TYPES
// ==========================================

// Parse key=value pairs
type TLTParseQuery<T extends string> = T extends `${infer Key}=${infer Value}&${infer Rest}`
  ? { [K in Key]: Value } & TLTParseQuery<Rest>
  : T extends `${infer Key}=${infer Value}`
  ? { [K in Key]: Value }
  : {};

type TLTQueryString = TLTParseQuery<"name=alice&age=25&active=true">;
// { name: "alice"; age: "25"; active: "true"; }

console.log("\n--- Parse Query String ---");
type TLTParsed = TLTQueryString;

// ==========================================
// 13. ROUTE PARAMETER EXTRACTION
// ==========================================

// Extract dynamic params from route
type TLTRouteParams<T extends string> = T extends `/${infer Rest}`
  ? TLTRouteParamsHelper<Rest>
  : never;

type TLTRouteParamsHelper<T> = T extends `${infer Segment}/${infer Rest}`
  ? Segment extends `:${infer Param}`
    ? { [K in Param]: string } & TLTRouteParamsHelper<Rest>
    : TLTRouteParamsHelper<Rest>
  : T extends `:${infer Param}`
  ? { [K in Param]: string }
  : {};

type TLTRoute = TLTRouteParams<"/users/:userId/posts/:postId">;
// { userId: string; postId: string; }

type TLTRoute2 = TLTRouteParams<"/api/v1/users/:id/profile">;
// { id: string; }

console.log("\n--- Route Parameter Extraction ---");
type TLTRouteExample = TLTRoute;

// ==========================================
// 14. ERROR MESSAGE TEMPLATES
// ==========================================

type TLTErrorCode = "NOT_FOUND" | "UNAUTHORIZED" | "VALIDATION_ERROR" | "SERVER_ERROR";
type TLTEntity = "user" | "post" | "comment" | "file";

type TLTErrorMessage = 
  | `ERR_${TLTErrorCode}`
  | `${TLTEntity}_${TLTErrorCode}`
  | `Failed to ${Lowercase<TLTAction>} ${Capitalize<TLTEntity>}`;

console.log("\n--- Error Message Templates ---");
type TLTErrors = TLTErrorMessage;
// "ERR_NOT_FOUND" | "ERR_UNAUTHORIZED" | ... | "user_NOT_FOUND" | "Failed to create User" | ...

// ==========================================
// 15. BRANDING WITH TEMPLATE LITERALS
// ==========================================

// Create branded types with template literals
type TLTBrand<T, B extends string> = T & { __brand: `${B}` };

type TLTUserId = TLTBrand<string, "UserId">;
type TLTProductId = TLTBrand<string, "ProductId">;
type TLTOrderId = TLTBrand<string, "OrderId">;

function tltCreateUserId(id: string): TLTUserId {
  return id as TLTUserId;
}

function tltCreateProductId(id: string): TLTProductId {
  return id as TLTProductId;
}

console.log("\n--- Branded Types with Template Literals ---");
const tltUserId = tltCreateUserId("123");
const tltProductId = tltCreateProductId("456");
console.log(tltUserId, tltProductId);

// ==========================================
// 16. ADVANCED: CONDITIONAL TEMPLATE LITERALS
// ==========================================

// Conditional template literal based on type
// Constrained to primitive types that can be in template literals
type TLTFormat<T extends string | number | boolean | null | undefined> = 
  T extends string 
    ? `string:${T}`
    : T extends number
    ? `number:${T}`
    : T extends boolean
    ? `boolean:${T}`
    : T extends null
    ? `null`
    : `undefined`;

type TLTFormatString = TLTFormat<"hello">;  // "string:hello"
type TLTFormatNumber = TLTFormat<42>;  // "number:42"
type TLTFormatBool = TLTFormat<true>;  // "boolean:true"
type TLTFormatNull = TLTFormat<null>;  // "null"
type TLTFormatUndefined = TLTFormat<undefined>;  // "undefined"

console.log("\n--- Conditional Template Literals ---");
type TLTFormatExamples = TLTFormatString | TLTFormatNumber | TLTFormatBool | TLTFormatNull | TLTFormatUndefined;

// ==========================================
// 17. FILE PATH / GLOB PATTERNS
// ==========================================

type TLTFileExtension = "ts" | "tsx" | "js" | "jsx" | "json" | "css" | "scss";
type TLTDirectory = "src" | "lib" | "components" | "hooks" | "utils" | "types";
type TLTFileName = "index" | "main" | "app" | "config" | "types";

type TLTFilePath = `${TLTDirectory}/${TLTFileName}.${TLTFileExtension}`;
// "src/index.ts" | "src/main.tsx" | "lib/utils.js" | ...

type TLTGlobPattern = `**/*.${TLTFileExtension}`;
// "**/*.ts" | "**/*.tsx" | "**/*.js" | ...

console.log("\n--- File Path / Glob Patterns ---");
type TLTFiles = TLTFilePath;

// ==========================================
// 18. VERSIONED API TYPES
// ==========================================

type TLTAPIVersion2 = "v1" | "v2" | "v3" | "latest";
type TLTAPIEndpoint = 
  | "/health"
  | `/api/${TLTAPIVersion2}/users`
  | `/api/${TLTAPIVersion2}/users/:id`
  | `/api/${TLTAPIVersion2}/posts`
  | `/api/${TLTAPIVersion2}/posts/:id`;

// Extract version from endpoint
type TLTExtractAPIVersion<T> = T extends `/api/${infer V}/` ? V : never;

type TLTV1Endpoint = TLTExtractAPIVersion<"/api/v1/users">;  // "v1"
type TLTV2Endpoint = TLTExtractAPIVersion<"/api/v2/posts/123">;  // "v2"

console.log("\n--- Versioned API Types ---");
type TLTVersions = TLTV1Endpoint | TLTV2Endpoint;

// ==========================================
// 19. TESTING / SNAPSHOT TYPES
// ==========================================

// Snapshot testing keys
type TLTTestSuite = "unit" | "integration" | "e2e";
type TLTTestCase = "should render" | "should handle click" | "should validate" | "should fetch";

type TLTSnapshotKey = `${TLTTestSuite}/${TLTTestCase}`;
// "unit/should render" | "integration/should handle click" | ...

console.log("\n--- Testing Snapshot Keys ---");
type TLTSnapshots = TLTSnapshotKey;