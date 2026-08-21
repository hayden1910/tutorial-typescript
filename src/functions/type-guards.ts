// ==========================================
// TYPE GUARDS & NARROWING
// ==========================================

// ==========================================
// 1. BUILT-IN TYPE GUARDS
// ==========================================

// typeof guard
function guardProcessValue(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(`String: ${value.toUpperCase()}`);
  } else if (typeof value === "number") {
    console.log(`Number: ${value.toFixed(2)}`);
  } else {
    console.log(`Boolean: ${value}`);
  }
}

console.log("--- typeof Guard ---");
guardProcessValue("hello");
guardProcessValue(42);
guardProcessValue(true);

// instanceof guard
class GuardAnimal {
  name: string;
  constructor(name: string) { this.name = name; }
}

class GuardDog extends GuardAnimal {
  bark() { return "Woof!"; }
}

class GuardCat extends GuardAnimal {
  meow() { return "Meow!"; }
}

function guardMakeSound(animal: GuardAnimal) {
  if (animal instanceof GuardDog) {
    console.log(`${animal.name} says ${animal.bark()}`);
  } else if (animal instanceof GuardCat) {
    console.log(`${animal.name} says ${animal.meow()}`);
  } else {
    console.log(`${animal.name} is silent`);
  }
}

console.log("\n--- instanceof Guard ---");
guardMakeSound(new GuardDog("Rex"));
guardMakeSound(new GuardCat("Whiskers"));
guardMakeSound(new GuardAnimal("Generic"));

// in guard
interface GuardFish {
  swim(): void;
}

interface GuardBird {
  fly(): void;
}

function guardMovePet(pet: GuardFish | GuardBird) {
  if ("swim" in pet) {
    pet.swim();
  } else {
    pet.fly();
  }
}

console.log("\n--- in Guard ---");
guardMovePet({ swim: () => console.log("Swimming...") });
guardMovePet({ fly: () => console.log("Flying...") });

// ==========================================
// 2. CUSTOM TYPE PREDICATES
// ==========================================

interface GuardUser {
  type: "user";
  name: string;
  email: string;
}

interface GuardAdmin {
  type: "admin";
  name: string;
  permissions: string[];
}

type GuardPerson = GuardUser | GuardAdmin;

// Type predicate: parameterName is Type
function guardIsAdmin(person: GuardPerson): person is GuardAdmin {
  return person.type === "admin";
}

function guardIsUser(person: GuardPerson): person is GuardUser {
  return person.type === "user";
}

function guardGreet(person: GuardPerson) {
  if (guardIsAdmin(person)) {
    console.log(`Admin ${person.name} has permissions: ${person.permissions.join(", ")}`);
  } else if (guardIsUser(person)) {
    console.log(`User ${person.name} (${person.email})`);
  }
}

console.log("\n--- Custom Type Predicates ---");
guardGreet({ type: "user", name: "Alice", email: "alice@example.com" });
guardGreet({ type: "admin", name: "Bob", permissions: ["read", "write", "delete"] });

// More complex predicate
interface GuardRectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface GuardCircle {
  kind: "circle";
  radius: number;
}

type GuardShape = GuardRectangle | GuardCircle;

function guardIsRectangle(shape: GuardShape): shape is GuardRectangle {
  return shape.kind === "rectangle";
}

function guardGetArea(shape: GuardShape): number {
  if (guardIsRectangle(shape)) {
    return shape.width * shape.height;
  }
  return Math.PI * shape.radius ** 2;
}

console.log("\n--- Shape Area with Predicate ---");
console.log("Rectangle:", guardGetArea({ kind: "rectangle", width: 10, height: 5 }));
console.log("Circle:", guardGetArea({ kind: "circle", radius: 3 }));

// Predicate with generics
function guardIsNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function guardFilterNonNullable<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter(guardIsNonNullable);
}

console.log("\n--- Generic Predicate ---");
console.log(guardFilterNonNullable([1, null, 2, undefined, 3]));
console.log(guardFilterNonNullable(["a", null, "b", undefined]));

// ==========================================
// 3. DISCRIMINATED UNIONS
// ==========================================

interface GuardLoadingState {
  status: "loading";
}

interface GuardSuccessState<T> {
  status: "success";
  data: T;
}

interface GuardErrorState {
  status: "error";
  error: string;
}

type GuardAsyncState<T> = GuardLoadingState | GuardSuccessState<T> | GuardErrorState;

function guardHandleState<T>(state: GuardAsyncState<T>) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Success:", state.data);
      break;
    case "error":
      console.log("Error:", state.error);
      break;
  }
}

console.log("\n--- Discriminated Union ---");
guardHandleState({ status: "loading" });
guardHandleState({ status: "success", data: { id: 1, name: "Test" } });
guardHandleState({ status: "error", error: "Failed to fetch" });

// Event system with discriminated union
type GuardAppEvent =
  | { type: "click"; x: number; y: number }
  | { type: "keypress"; key: string }
  | { type: "resize"; width: number; height: number }
  | { type: "scroll"; deltaY: number };

function guardHandleEvent(event: GuardAppEvent) {
  switch (event.type) {
    case "click":
      console.log(`Click at (${event.x}, ${event.y})`);
      break;
    case "keypress":
      console.log(`Key pressed: ${event.key}`);
      break;
    case "resize":
      console.log(`Resized to ${event.width}x${event.height}`);
      break;
    case "scroll":
      console.log(`Scrolled by ${event.deltaY}`);
      break;
  }
}

console.log("\n--- Event Handling ---");
guardHandleEvent({ type: "click", x: 100, y: 200 });
guardHandleEvent({ type: "keypress", key: "Enter" });
guardHandleEvent({ type: "resize", width: 1920, height: 1080 });

// Exhaustiveness checking with never
function guardAssertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function guardHandleEventExhaustive(event: GuardAppEvent) {
  switch (event.type) {
    case "click":
      console.log("Click handled");
      break;
    case "keypress":
      console.log("Keypress handled");
      break;
    case "resize":
      console.log("Resize handled");
      break;
    case "scroll":
      console.log("Scroll handled");
      break;
    default:
      guardAssertNever(event);  // Error if new type added without handling
  }
}

// ==========================================
// 4. ASSERTION FUNCTIONS
// ==========================================

// asserts condition
function guardAssert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function guardParseConfig(config: unknown) {
  guardAssert(typeof config === "object" && config !== null, "Config must be object");
  guardAssert("apiUrl" in config, "Missing apiUrl");
  guardAssert(typeof config.apiUrl === "string", "apiUrl must be string");
  guardAssert("timeout" in config, "Missing timeout");
  guardAssert(typeof config.timeout === "number", "timeout must be number");

  // TypeScript knows config has apiUrl and timeout here
  return config as { apiUrl: string; timeout: number };
}

console.log("\n--- Assertion Functions ---");
try {
  console.log(guardParseConfig({ apiUrl: "https://api.com", timeout: 5000 }));
} catch (e) {
  console.log("Error:", (e as Error).message);
}

try {
  guardParseConfig({ apiUrl: "https://api.com" }); // Missing timeout
} catch (e) {
  console.log("Error:", (e as Error).message);
}

// asserts with type predicate
function guardAssertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}

function guardProcessString(value: unknown) {
  guardAssertIsString(value);
  // value is now narrowed to string
  console.log(value.toUpperCase());
}

console.log("\n--- Asserts Type Predicate ---");
guardProcessString("hello");
// guardProcessString(123); // Throws

// Asserts for array element
function guardAssertArray<T>(arr: unknown, guard: (item: unknown) => item is T): asserts arr is T[] {
  if (!Array.isArray(arr)) {
    throw new Error("Not an array");
  }
  for (const item of arr) {
    if (!guard(item)) {
      throw new Error("Array contains invalid item");
    }
  }
}

function guardIsString(item: unknown): item is string {
  return typeof item === "string";
}

function guardProcessStringArray(arr: unknown) {
  guardAssertArray(arr, guardIsString);
  // arr is now string[]
  console.log(arr.join(", "));
}

console.log("\n--- Assert Array ---");
guardProcessStringArray(["a", "b", "c"]);
// guardProcessStringArray([1, 2, 3]); // Throws

// ==========================================
// 5. PRACTICAL: FORM VALIDATION
// ==========================================

interface GuardFormField<T> {
  value: T;
  error?: string;
}

type GuardFormState = {
  username: GuardFormField<string>;
  email: GuardFormField<string>;
  age: GuardFormField<number>;
};

function guardValidateUsername(field: GuardFormField<string>): field is GuardFormField<string> & { error: undefined } {
  if (field.value.length < 3) {
    field.error = "Username must be at least 3 characters";
    return false;
  }
  delete field.error;
  return true;
}

function guardValidateEmail(field: GuardFormField<string>): field is GuardFormField<string> & { error: undefined } {
  if (!field.value.includes("@")) {
    field.error = "Invalid email";
    return false;
  }
  delete field.error;
  return true;
}

function guardValidateAge(field: GuardFormField<number>): field is GuardFormField<number> & { error: undefined } {
  if (field.value < 18) {
    field.error = "Must be 18 or older";
    return false;
  }
  delete field.error;
  return true;
}

function guardValidateForm(form: GuardFormState): form is GuardFormState & {
  username: GuardFormField<string> & { error: undefined };
  email: GuardFormField<string> & { error: undefined };
  age: GuardFormField<number> & { error: undefined };
} {
  return (
    guardValidateUsername(form.username) &&
    guardValidateEmail(form.email) &&
    guardValidateAge(form.age)
  );
}

function guardSubmitForm(form: GuardFormState) {
  if (guardValidateForm(form)) {
    console.log("Form submitted:", {
      username: form.username.value,
      email: form.email.value,
      age: form.age.value,
    });
  } else {
    console.log("Validation failed:");
    console.log("Username:", form.username.error);
    console.log("Email:", form.email.error);
    console.log("Age:", form.age.error);
  }
}

console.log("\n--- Form Validation ---");
guardSubmitForm({
  username: { value: "al" },
  email: { value: "invalid" },
  age: { value: 16 },
});

guardSubmitForm({
  username: { value: "alice" },
  email: { value: "alice@example.com" },
  age: { value: 25 },
});