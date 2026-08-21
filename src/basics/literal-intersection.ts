// ==========================================
// LITERAL & INTERSECTION TYPES
// ==========================================

// ==========================================
// 1. LITERAL TYPES
// ==========================================

// String literals
type LIDirection = "up" | "down" | "left" | "right";

function liMove(dir: LIDirection) {
  console.log(`Moving ${dir}`);
}

console.log("--- String Literal Types ---");
liMove("up");
liMove("left");
// liMove("diagonal"); // Error

// Numeric literals
type LIDiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function liRollDice(): LIDiceRoll {
  return Math.floor(Math.random() * 6) + 1 as LIDiceRoll;
}

console.log("\n--- Numeric Literal Types ---");
console.log(liRollDice());
console.log(liRollDice());

// Boolean literals (rarely used directly)
type LITrue = true;
type LIFalse = false;

// Template literal types (TypeScript 4.1+)
type LIEventName = `on${"Click" | "Change" | "Submit" | "Focus"}`;
// "onClick" | "onChange" | "onSubmit" | "onFocus"

type LICSSProperty = `margin${"" | "Top" | "Right" | "Bottom" | "Left"}`;
// "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft"

type LIPaddingProperty = `padding${"-"}${"top" | "right" | "bottom" | "left"}`;
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

console.log("\n--- Template Literal Types ---");
const liEvent: LIEventName = "onClick";
const css: LICSSProperty = "marginTop";
const padding: LIPaddingProperty = "padding-left";
console.log(liEvent, css, padding);

// Literal inference with const
const liStatus = "success" as const;
// type: "success" (not string)

const liConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;
// {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

console.log("\n--- Literal Inference with as const ---");
console.log(liStatus);
console.log(liConfig);

// ==========================================
// 2. INTERSECTION TYPES (&)
// ==========================================

interface LIHasName {
  name: string;
}

interface LIHasAge {
  age: number;
}

interface LIHasEmail {
  email: string;
}

// Intersection combines all properties
type LIPerson = LIHasName & LIHasAge & LIHasEmail;
// { name: string; age: number; email: string; }

const person: LIPerson = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
};

console.log("\n--- Intersection Types ---");
console.log(person);

// Intersection with primitives (results in never)
type LIImpossible = string & number;
// never

// Intersection of object types with same property
interface LIA {
  x: number;
  y: string;
}

interface LIB {
  x: string;  // Conflict!
  z: boolean;
}

type LIAB = LIA & LIB;
// x: number & string = never
// y: string
// z: boolean

// Practical: Mixin pattern
interface LITimestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface LISerializable {
  toJSON(): string;
}

interface LIUser extends LITimestamped, LISerializable {
  id: number;
  name: string;
}

const liUser: LIUser = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
  updatedAt: new Date(),
  toJSON() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  },
};

console.log("\n--- Intersection with Mixins ---");
console.log(liUser.toJSON());

// ==========================================
// 3. INTERSECTION vs UNION
// ==========================================

// Union: value is ONE of the types
type LIUnion = { kind: "a"; a: number } | { kind: "b"; b: string };
// Can be { kind: "a"; a: number } OR { kind: "b"; b: string }

const liUnion1: LIUnion = { kind: "a", a: 1 };
const liUnion2: LIUnion = { kind: "b", b: "hello" };

// Intersection: value MUST satisfy ALL types
type LIIntersection = { kind: "a"; a: number } & { kind: "b"; b: string };
// Must have BOTH: kind must be "a" AND "b" (impossible = never)

console.log("\n--- Union vs Intersection ---");
console.log("Union:", liUnion1, liUnion2);

// Practical: Adding metadata
interface LIEntity {
  id: string;
}

interface LIMetadata {
  createdAt: Date;
  version: number;
}

type LIEntityWithMeta = LIEntity & LIMetadata;

const entity: LIEntityWithMeta = {
  id: "e1",
  createdAt: new Date(),
  version: 1,
};

console.log("Entity with metadata:", entity);

// ==========================================
// 4. DISCRIMINATED UNIONS WITH INTERSECTION
// ==========================================

interface LIBaseEvent {
  timestamp: number;
  userId: string;
}

interface LIClickEvent extends LIBaseEvent {
  type: "click";
  x: number;
  y: number;
}

interface LIKeyEvent extends LIBaseEvent {
  type: "keypress";
  key: string;
}

type LIAppEvent = LIClickEvent | LIKeyEvent;

// Type-safe handler using intersection
function liHandleEvent(event: LIAppEvent & { type: "click" }): void;
function liHandleEvent(event: LIAppEvent & { type: "keypress" }): void;
function liHandleEvent(event: LIAppEvent): void {
  switch (event.type) {
    case "click":
      console.log(`Click at (${event.x}, ${event.y}) by user ${event.userId}`);
      break;
    case "keypress":
      console.log(`Key "${event.key}" pressed by user ${event.userId}`);
      break;
  }
}

console.log("\n--- Discriminated Union with Intersection ---");
liHandleEvent({ type: "click", timestamp: Date.now(), userId: "u1", x: 100, y: 200 });
liHandleEvent({ type: "keypress", timestamp: Date.now(), userId: "u1", key: "Enter" });

// ==========================================
// 5. BRANDED TYPES (Nominal typing with intersection)
// ==========================================

type LIBrand<T, B> = T & { __brand: B };

type LIUserId = LIBrand<string, "UserId">;
type LIProductId = LIBrand<string, "ProductId">;

function liCreateUserId(id: string): LIUserId {
  return id as LIUserId;
}

function liCreateProductId(id: string): LIProductId {
  return id as LIProductId;
}

function liGetUserById(id: LIUserId): string {
  return `User ${id}`;
}

function liGetProductById(id: LIProductId): string {
  return `Product ${id}`;
}

console.log("\n--- Branded Types ---");
const liUserId = liCreateUserId("123");
const liProductId = liCreateProductId("456");

console.log(liGetUserById(liUserId));
// liGetUserById(liProductId); // Error: ProductId not assignable to UserId
// liGetUserById("123"); // Error: string not assignable to UserId

// ==========================================
// 6. INTERSECTION IN GENERICS
// ==========================================

function liExtend<T, U>(obj: T, extra: U): T & U {
  return { ...obj, ...extra };
}

const liBase = { id: 1, name: "Alice" };
const liWithEmail = liExtend(liBase, { email: "alice@example.com" });
const liWithAge = liExtend(liWithEmail, { age: 28 });

console.log("\n--- Intersection in Generics ---");
console.log(liWithAge); // { id: 1, name: "Alice", email: "...", age: 28 }

// ==========================================
// 7. PRACTICAL: API RESPONSE TYPES
// ==========================================

interface LISuccessResponse<T> {
  success: true;
  data: T;
}

interface LIErrorResponse {
  success: false;
  error: string;
  code: number;
}

type LIApiResponse<T> = LISuccessResponse<T> | LIErrorResponse;

function liIsSuccess<T>(response: LIApiResponse<T>): response is LISuccessResponse<T> {
  return response.success;
}

function liHandleResponse<T>(response: LIApiResponse<T>) {
  if (liIsSuccess(response)) {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error, "Code:", response.code);
  }
}

console.log("\n--- API Response Types ---");
liHandleResponse({ success: true, data: { id: 1, name: "Alice" } });
liHandleResponse({ success: false, error: "Not found", code: 404 });

// ==========================================
// 8. REQUIRED FIELDS WITH INTERSECTION
// ==========================================

interface LIPartialUser {
  name?: string;
  email?: string;
}

type LIRequiredUser = LIPartialUser & {
  name: string;
  email: string;
};

const liRequired: LIRequiredUser = {
  name: "Alice",
  email: "alice@example.com",
};

console.log("\n--- Required Fields with Intersection ---");
console.log(liRequired);

// ==========================================
// 9. LITERAL TYPES IN OBJECT PROPERTIES
// ==========================================

type LIHttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface LIApiRequest {
  method: LIHttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

const liRequest: LIApiRequest = {
  method: "POST",
  url: "/api/users",
  body: { name: "Alice" },
};

console.log("\n--- Literal Types in Properties ---");
console.log(liRequest);

// Narrowing with literal types
function liProcessRequest(req: LIApiRequest) {
  switch (req.method) {
    case "GET":
      console.log("Fetching data...");
      break;
    case "POST":
      console.log("Creating resource...");
      break;
    case "PUT":
      console.log("Updating resource...");
      break;
    case "DELETE":
      console.log("Deleting resource...");
      break;
    case "PATCH":
      console.log("Patching resource...");
      break;
  }
}

console.log("\n--- Narrowing with Literals ---");
liProcessRequest(liRequest);
liProcessRequest({ method: "GET", url: "/api/users" });

// ==========================================
// 10. CONST ASSERTIONS WITH LITERALS
// ==========================================

const liActions = ["save", "load", "delete", "update"] as const;
type LIAction = (typeof liActions)[number];
// "save" | "load" | "delete" | "update"

function liDispatch(action: LIAction) {
  console.log(`Dispatching: ${action}`);
}

console.log("\n--- Const Assertions ---");
liActions.forEach(liDispatch);

// ==========================================
// 11. NEVER FROM IMPOSSIBLE INTERSECTION
// ==========================================

type LINeverType = string & number;
// never

function liExhaustiveCheck(x: never): never {
  throw new Error("Should never happen");
}

function liProcessValue(value: string | number) {
  if (typeof value === "string") {
    console.log("String:", value);
  } else if (typeof value === "number") {
    console.log("Number:", value);
  } else {
    liExhaustiveCheck(value); // TypeScript ensures all cases handled
  }
}

console.log("\n--- Exhaustive Checking with never ---");
liProcessValue("hello");
liProcessValue(42);