// ==========================================
// SATISFIES & AS CONST
// ==========================================

// ==========================================
// 1. as const - Deep readonly + literal types
// ==========================================

// Without as const - widens to string/number/boolean
const sacConfig1 = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  enableCache: true,
};

// With as const - preserves literal types
const sacConfig2 = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  enableCache: true,
} as const;

console.log("--- as const ---");
console.log("config1 type:", {} as typeof sacConfig1);
// { apiUrl: string; timeout: number; retries: number; enableCache: boolean; }

console.log("config2 type:", {} as typeof sacConfig2);
// {
  //   readonly apiUrl: "https://api.example.com";
  //   readonly timeout: 5000;
  //   readonly retries: 3;
  //   readonly enableCache: true;
  // }

// Arrays with as const
const sacColors1 = ["red", "green", "blue"];
const sacColors2 = ["red", "green", "blue"] as const;

console.log("\n--- Arrays with as const ---");
console.log("colors1:", {} as typeof sacColors1);  // string[]
console.log("colors2:", {} as typeof sacColors2);  // readonly ["red", "green", "blue"]

type SACColorTuple = typeof sacColors2;
// readonly ["red", "green", "blue"]

// ==========================================
// 2. satisfies - Validate type without widening
// ==========================================

// Problem: as const makes everything readonly
const sacUser1 = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
} as const;
// Type: { readonly name: "Alice"; readonly age: 28; readonly email: "alice@example.com"; }

// Problem: without as const, literal types are widened
const sacUser2 = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
};
// Type: { name: string; age: number; email: string; }

// Solution: satisfies - validates shape but keeps inferred type
interface SACUser {
  name: string;
  age: number;
  email: string;
}

const sacUser3 = {
  name: "Alice",
  age: 28,
  email: "alice@example.com",
} satisfies SACUser;
// Type: { name: "Alice"; age: 28; email: "alice@example.com"; }
// (not readonly, keeps literals!)

console.log("\n--- satisfies ---");
console.log("user3 type:", {} as typeof sacUser3);

// satisfies with unions
type SACStatus = "pending" | "success" | "error";

const sacStatus1 = "success" as const;        // "success"
const sacStatus2 = "success" satisfies SACStatus; // "success"

console.log("status1:", {} as typeof sacStatus1);
console.log("status2:", {} as typeof sacStatus2);

// satisfies catches errors
// const invalid = "invalid" satisfies Status; // Error!

// ==========================================
// 3. satisfies vs as const - When to use which
// ==========================================

/*
as const:
- Makes entire object deeply readonly
- Preserves ALL literal types
- Use for: constants, config, enums alternatives

satisfies:
- Validates against a type
- Keeps inferred type (literals, not readonly)
- Use for: validating config, ensuring shape, when you need mutability
*/

// Practical: Color palette
const sacPalette = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
} as const;

// Type: { readonly primary: "#007bff"; ... }

// With satisfies - can validate against a pattern
type SACHEXColor = `#${string}`;

const sacTheme = {
  primary: "#007bff",
  secondary: "#6c757d",
} satisfies Record<string, SACHEXColor>;
// Type: { primary: "#007bff"; secondary: "#6c757d"; }
// Not readonly!

console.log("\n--- Practical: Theme with satisfies ---");
console.log(sacTheme);

// ==========================================
// 4. satisfies with Generics
// ==========================================

function sacCreateConfig<T extends Record<string, any>>(config: T): T {
  return config;
}

// Without satisfies - returns exact type passed
const sacCfg1 = sacCreateConfig({ apiUrl: "https://api.com", timeout: 5000 });

// With satisfies - validates but keeps literal inference
const sacCfg2 = sacCreateConfig({
  apiUrl: "https://api.com",
  timeout: 5000,
} satisfies { apiUrl: string; timeout: number });

console.log("\n--- satisfies with Generics ---");
console.log(sacCfg1);
console.log(sacCfg2);

// ==========================================
// 5. Practical: Type-safe Event Handlers
// ==========================================

type SACEventHandlers = {
  onClick: (x: number, y: number) => void;
  onHover: (element: HTMLElement) => void;
  onSubmit: (data: FormData) => void;
};

const sacHandlers = {
  onClick: (x: number, y: number) => console.log(`Click at ${x}, ${y}`),
  onHover: (el: HTMLElement) => console.log("Hover:", el.tagName),
  onSubmit: (data: FormData) => console.log("Submit:", data),
} satisfies SACEventHandlers;

console.log("\n--- Type-safe Event Handlers ---");
sacHandlers.onClick(100, 200);
// sacHandlers.onClick("invalid"); // Error in IDE

// ==========================================
// 6. satisfies with Excess Property Checking
// ==========================================

interface SACButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

// This would error with satisfies - excess property checking
// const sacButtonProps = {
//   label: "Submit",
//   onClick: () => console.log("clicked"),
//   variant: "primary",
//   disabled: true,  // Excess property
// } satisfies SACButtonProps;

// But we CAN do this with a variable:
const sacExtraProps = {
  label: "Submit",
  onClick: () => console.log("clicked"),
  variant: "primary" as const,
  disabled: true,
} satisfies SACButtonProps & { disabled: boolean };

console.log("\n--- Excess Property Checking ---");
console.log(sacExtraProps);

// ==========================================
// 7. satisfies for Array/Object Validation
// ==========================================

const sacRoutes = [
  { path: "/", component: "Home" },
  { path: "/about", component: "About" },
  { path: "/contact", component: "Contact" },
] satisfies Array<{ path: string; component: string }>;

console.log("\n--- Array Validation ---");
console.log(sacRoutes);

// ==========================================
// 8. Advanced: satisfies with Mapped Types
// ==========================================

type SACRequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface SACPartialUser {
  name?: string;
  email?: string;
  age?: number;
}

// Validate that we have at least name and email
const sacUserData = {
  name: "Alice",
  email: "alice@example.com",
} satisfies SACRequiredFields<SACPartialUser, "name" | "email">;

console.log("\n--- satisfies with Mapped Types ---");
console.log(sacUserData);

// ==========================================
// 9. satisfies + as const together
// ==========================================

// Use as const for the VALUES, satisfies for the SHAPE
const sacAppConfig = {
  api: {
    baseUrl: "https://api.example.com",
    endpoints: {
      users: "/users",
      posts: "/posts",
    },
  },
  features: {
    darkMode: true,
    notifications: false,
  },
  version: "1.0.0",
} as const satisfies {
  api: {
    baseUrl: string;
    endpoints: Record<string, string>;
  };
  features: Record<string, boolean>;
  version: string;
};

console.log("\n--- satisfies + as const together ---");
console.log(sacAppConfig);

// ==========================================
// 10. Real-world: Form Validation Schema
// ==========================================

type SACValidationRule<T> =
  | { required: true; message: string }
  | { minLength: number; message: string }
  | { pattern: RegExp; message: string }
  | { custom: (value: T) => boolean; message: string };

type SACFieldSchema<T> = {
  [K in keyof T]?: SACValidationRule<T[K]>[];
};

interface SACLoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

const sacLoginSchema = {
  username: [
    { required: true, message: "Username is required" },
    { minLength: 3, message: "Min 3 characters" },
  ],
  password: [
    { required: true, message: "Password is required" },
    { minLength: 8, message: "Min 8 characters" },
  ],
  rememberMe: [],
} satisfies SACFieldSchema<SACLoginForm>;

console.log("\n--- Form Validation Schema ---");
console.log(sacLoginSchema);

// ==========================================
// 11. satisfies preserves literal types in arrays
// ==========================================

const sacAllowedMethods = ["GET", "POST", "PUT", "DELETE"] as const;
// readonly ["GET", "POST", "PUT", "DELETE"]

type SACHEXMethod = (typeof sacAllowedMethods)[number];
// "GET" | "POST" | "PUT" | "DELETE"

const sacMethods = ["GET", "POST"] satisfies SACHEXMethod[];
// Type: ("GET" | "POST")[]

console.log("\n--- Array literal preservation ---");
console.log("allowedMethods:", sacAllowedMethods);
console.log("methods:", sacMethods);

// ==========================================
// 12. satisfies with Conditional Types
// ==========================================

type SACNonEmptyArray<T> = [T, ...T[]];

const sacNumbers = [1, 2, 3] satisfies SACNonEmptyArray<number>;
const sacStrings = ["a", "b"] satisfies SACNonEmptyArray<string>;
// const empty = [] satisfies NonEmptyArray<number>; // Error!

console.log("\n--- Conditional Types with satisfies ---");
console.log(sacNumbers, sacStrings);