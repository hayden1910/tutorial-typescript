// ==========================================
// TYPE OPERATORS: keyof, typeof, T[K]
// ==========================================

// ==========================================
// 1. keyof - Get keys of a type as union
// ==========================================

interface TOpUser {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  address?: {
    city: string;
    country: string;
  };
}

type TOpUserKeys = keyof TOpUser;
// "id" | "name" | "email" | "age" | "isActive" | "address"

console.log("--- keyof ---");
const topKeys: TOpUserKeys[] = ["id", "name", "email", "age", "isActive", "address"];
console.log(topKeys);

// Practical: Generic function to get property
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const topUser: TOpUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  isActive: true,
};

console.log("\n--- getProperty<T, K extends keyof T> ---");
console.log(getProperty(topUser, "name"));     // string
console.log(getProperty(topUser, "age"));      // number
console.log(getProperty(topUser, "email"));    // string

// ==========================================
// 2. typeof - Get type of a value (in type position)
// ==========================================

const topConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  enableCache: true,
};

type TOpConfig = typeof topConfig;
// {
  //   apiUrl: string;
  //   timeout: number;
  //   retries: number;
  //   enableCache: boolean;
  // }

console.log("\n--- typeof (type position) ---");
console.log(topConfig);

function createConfig(overrides: Partial<TOpConfig>): TOpConfig {
  return { ...topConfig, ...overrides };
}

console.log(createConfig({ timeout: 10000 }));

// typeof with function
function topGreet(name: string): string {
  return `Hello, ${name}!`;
}

type TOpGreetFn = typeof topGreet;
// (name: string) => string

type TOpGreetParams = Parameters<typeof topGreet>;
// [name: string]

type TOpGreetReturn = ReturnType<typeof topGreet>;
// string

console.log("\n--- typeof with function ---");
const fn: TOpGreetFn = topGreet;
console.log(fn("Bob"));

// ==========================================
// 3. Indexed Access Type T[K] - Property type lookup
// ==========================================

type TOpUserId = TOpUser["id"];           // number
type TOpUserName = TOpUser["name"];       // string
type TOpUserEmail = TOpUser["email"];     // string

type TOpUserOptionalAddress = TOpUser["address"];  // { city: string; country: string; } | undefined

console.log("\n--- Indexed Access T[K] ---");
const topId: TOpUserId = 1;
const topName: TOpUserName = "Alice";
console.log(topId, topName);

// With union of keys
type TOpUserPrimitive = TOpUser["id" | "name" | "age"];
// string | number

type TOpUserAllValues = TOpUser[keyof TOpUser];
// number | string | boolean | { city: string; country: string; } | undefined

console.log("User primitive fields:", {} as TOpUserPrimitive);

// Practical: Pick multiple fields
type TOpUserPreview = {
  [K in "id" | "name" | "email"]: TOpUser[K];
};
// { id: number; name: string; email: string; }

const topPreview: TOpUserPreview = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};
console.log("\n--- Mapped with indexed access ---");
console.log(topPreview);

// ==========================================
// 4. Combining keyof + typeof + T[K]
// ==========================================

const defaultSettings = {
  theme: "dark" as const,
  fontSize: 14,
  language: "en" as const,
  autoSave: true,
} as const;

type TOpSettings = typeof defaultSettings;
// { readonly theme: "dark"; readonly fontSize: 14; readonly language: "en"; readonly autoSave: true; }

type TOpSettingsKeys = keyof TOpSettings;
// "theme" | "fontSize" | "language" | "autoSave"

type TOpSettingsValues = TOpSettings[TOpSettingsKeys];
// "dark" | 14 | "en" | true

console.log("\n--- Combining keyof + typeof + T[K] ---");
console.log(defaultSettings);

function getSetting<K extends TOpSettingsKeys>(key: K): TOpSettings[K] {
  return defaultSettings[key];
}

console.log("theme:", getSetting("theme"));
console.log("fontSize:", getSetting("fontSize"));

// ==========================================
// 5. Practical: Type-safe event emitter
// ==========================================

interface TOpEvents {
  click: { x: number; y: number };
  keypress: { key: string };
  resize: { width: number; height: number };
  scroll: { deltaY: number };
}

type TOpEventName = keyof TOpEvents;
// "click" | "keypress" | "resize" | "scroll"

type TOpEventData<K extends TOpEventName> = TOpEvents[K];
// { x: number; y: number } | { key: string } | { width: number; height: number } | { deltaY: number }

class TOpEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach((handler) => handler(data));
  }
}

console.log("\n--- Type-safe EventEmitter ---");
const emitter = new TOpEventEmitter<TOpEvents>();

emitter.on("click", (data) => {
  console.log("Click at:", data.x, data.y);
});

emitter.on("keypress", (data) => {
  console.log("Key pressed:", data.key);
});

emitter.emit("click", { x: 100, y: 200 });
emitter.emit("keypress", { key: "Enter" });

// ==========================================
// 6. Practical: Form field validators
// ==========================================

interface TOpFormFields {
  username: string;
  email: string;
  password: string;
  age: number;
}

type TOpFieldName = keyof TOpFormFields;
// "username" | "email" | "password" | "age"

type TOpFieldType<K extends TOpFieldName> = TOpFormFields[K];

interface TOpValidator<T> {
  validate: (value: T) => string | null;
}

const validators: { [K in TOpFieldName]?: TOpValidator<TOpFormFields[K]> } = {
  username: {
    validate: (v) => (v.length < 3 ? "Min 3 chars" : null),
  },
  email: {
    validate: (v) => (v.includes("@") ? null : "Invalid email"),
  },
  password: {
    validate: (v) => (v.length < 8 ? "Min 8 chars" : null),
  },
  age: {
    validate: (v) => (v >= 18 ? null : "Must be 18+"),
  },
};

function validateField<K extends TOpFieldName>(field: K, value: TOpFormFields[K]): string | null {
  return validators[field]?.validate(value) ?? null;
}

console.log("\n--- Form Validators ---");
console.log(validateField("username", "ab"));      // "Min 3 chars"
console.log(validateField("username", "alice"));   // null
console.log(validateField("email", "invalid"));    // "Invalid email"
console.log(validateField("age", 16));             // "Must be 18+"
console.log(validateField("age", 25));             // null

// ==========================================
// 7. Advanced: keyof with generics
// ==========================================

function topPick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

function topOmit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

console.log("\n--- Generic pick/omit ---");
const picked = topPick(topUser, ["id", "name"]);
console.log("Picked:", picked);

const omitted = topOmit(topUser, ["email", "age"]);
console.log("Omitted:", omitted);

// ==========================================
// 8. keyof any / keyof string / keyof number
// ==========================================

type TOpStringKeys = keyof string;
// "length" | "toUpperCase" | "toLowerCase" | ... (all string methods)

type TOpNumberKeys = keyof number;
// "toFixed" | "toExponential" | "toPrecision" | ...

type TOpAnyKeys = keyof any;
// string | number | symbol

console.log("\n--- keyof primitives ---");
// These are mostly useful for type-level programming