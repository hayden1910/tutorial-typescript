// ==========================================
// UTILITY TYPES
// ==========================================

// Base types for demonstrations
interface UtilUser {
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

type UtilUserKeys = keyof UtilUser;
// "id" | "name" | "email" | "age" | "isActive" | "address"

console.log("--- Base User Type ---");
const utilUser: UtilUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  isActive: true,
  address: { city: "NYC", country: "USA" },
};
console.log(utilUser);

// ==========================================
// 1. Partial<T> - Make all properties optional
// ==========================================
type PartialUser = Partial<UtilUser>;
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean; address?: {...} }

function updateUser(user: UtilUser, updates: PartialUser): UtilUser {
  return { ...user, ...updates };
}

console.log("\n--- Partial<T> ---");
console.log(updateUser(utilUser, { name: "Alice Smith" }));
console.log(updateUser(utilUser, { age: 29, isActive: false }));

// ==========================================
// 2. Required<T> - Make all properties required
// ==========================================
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// { id: number; name: string; email: string }

console.log("\n--- Required<T> ---");
const required: RequiredUser = { id: 1, name: "Bob", email: "bob@example.com" };
console.log(required);

// ==========================================
// 3. Pick<T, K> - Select specific properties
// ==========================================
type UserPreview = Pick<UtilUser, "id" | "name" | "email">;
// { id: number; name: string; email: string }

type UserPublic = Omit<UtilUser, "email" | "address">;
// { id: number; name: string; age: number; isActive: boolean }

console.log("\n--- Pick<T, K> & Omit<T, K> ---");
const preview: UserPreview = { id: 1, name: "Alice", email: "alice@example.com" };
console.log("Preview:", preview);

const publicUser: UserPublic = { id: 1, name: "Alice", age: 28, isActive: true };
console.log("Public:", publicUser);

// ==========================================
// 4. Omit<T, K> - Remove specific properties
// ==========================================
type UserWithoutAddress = Omit<UtilUser, "address">;
// { id: number; name: string; email: string; age: number; isActive: boolean }

type UserWithoutId = Omit<UtilUser, "id">;
// { name: string; email: string; age: number; isActive: boolean; address?: {...} }

console.log("\n--- Omit<T, K> ---");
const withoutAddress: UserWithoutAddress = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  isActive: true,
};
console.log("Without address:", withoutAddress);

// ==========================================
// 5. Record<K, T> - Object type with specific keys and value type
// ==========================================
type UtilUserRole = "admin" | "user" | "guest";
type UtilPermissions = Record<UtilUserRole, string[]>;
// { admin: string[]; user: string[]; guest: string[] }

const permissions: UtilPermissions = {
  admin: ["read", "write", "delete", "manage"],
  user: ["read", "write"],
  guest: ["read"],
};

console.log("\n--- Record<K, T> ---");
console.log(permissions);

// Practical: Index by ID
type UsersById = Record<number, UtilUser>;

const usersById: UsersById = {
  1: { id: 1, name: "Alice", email: "a@a.com", age: 28, isActive: true },
  2: { id: 2, name: "Bob", email: "b@b.com", age: 32, isActive: true },
};

console.log("Users by ID:", usersById[1]);

// ==========================================
// 6. Readonly<T> - Make all properties readonly
// ==========================================
type ReadonlyUser = Readonly<UtilUser>;

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  isActive: true,
};

console.log("\n--- Readonly<T> ---");
console.log(readonlyUser.name);
// readonlyUser.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property

// Readonly arrays
const frozenNumbers: ReadonlyArray<number> = [1, 2, 3];
console.log("Readonly array:", frozenNumbers);
// frozenNumbers.push(4); // Error

// ==========================================
// 7. Exclude<T, U> - Remove types from union
// ==========================================
type AllTypes = string | number | boolean | null | undefined;
type NonNullableTypes = Exclude<AllTypes, null | undefined>;
// string | number | boolean

type Primitive = Exclude<AllTypes, object>;
// string | number | boolean | null | undefined

console.log("\n--- Exclude<T, U> ---");
const value: NonNullableTypes = "hello";
// const nullVal: NonNullableTypes = null; // Error

// ==========================================
// 8. Extract<T, U> - Extract types from union
// ==========================================
type StringOrNumber = Extract<AllTypes, string | number>;
// string | number

type FunctionType = Extract<AllTypes, Function>;
// never (no functions in AllTypes)

console.log("\n--- Extract<T, U> ---");
const strNum: StringOrNumber = 42;
console.log(strNum);

// Practical: Extract specific keys
type UserEditableFields = Extract<keyof UtilUser, "name" | "email" | "age">;
// "name" | "email" | "age"

const editableFields: UserEditableFields[] = ["name", "email", "age"];
console.log("Editable fields:", editableFields);

// ==========================================
// 9. ReturnType<T> - Get return type of function
// ==========================================
function createUser(name: string, email: string): UtilUser {
  return {
    id: Date.now(),
    name,
    email,
    age: 0,
    isActive: true,
  };
}

function getUserName(user: UtilUser): string {
  return user.name;
}

function getOptionalAddress(user: UtilUser): { city: string } | undefined {
  return user.address ? { city: user.address.city } : undefined;
}

type CreateUserReturn = ReturnType<typeof createUser>;    // UtilUser
type GetNameReturn = ReturnType<typeof getUserName>;       // string
type GetAddressReturn = ReturnType<typeof getOptionalAddress>; // { city: string } | undefined

console.log("\n--- ReturnType<T> ---");
const newUser: CreateUserReturn = createUser("Charlie", "charlie@example.com");
console.log(newUser);

// ==========================================
// 10. Parameters<T> - Get parameter types as tuple
// ==========================================
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, email: string]

type GetNameParams = Parameters<typeof getUserName>;
// [user: UtilUser]

console.log("\n--- Parameters<T> ---");
const params: CreateUserParams = ["David", "david@example.com"];
const created = createUser(...params);
console.log(created);

// ==========================================
// 11. Awaited<T> - Unwrap Promise
// ==========================================
async function utilFetchUserData(id: number): Promise<UtilUser> {
  return { id, name: "Fetched", email: "fetched@example.com", age: 25, isActive: true };
}

async function utilFetchUsers(): Promise<UtilUser[]> {
  return [
    { id: 1, name: "A", email: "a@a.com", age: 20, isActive: true },
    { id: 2, name: "B", email: "b@b.com", age: 30, isActive: false },
  ];
}

type FetchedUser = Awaited<ReturnType<typeof utilFetchUserData>>;
// UtilUser

type FetchedUsers = Awaited<ReturnType<typeof utilFetchUsers>>;
// UtilUser[]

console.log("\n--- Awaited<T> ---");
async function utilDemoAwaited() {
  const user = await utilFetchUserData(1);
  console.log("Single user:", user);

  const users = await utilFetchUsers();
  console.log("Multiple users:", users);
}

utilDemoAwaited();

// ==========================================
// COMBINING UTILITY TYPES
// ==========================================

// Partial + Pick: Optional subset
type UserUpdate = Partial<Pick<UtilUser, "name" | "email" | "age">>;

function patchUser(user: UtilUser, updates: UserUpdate): UtilUser {
  return { ...user, ...updates };
}

console.log("\n--- Combined: Partial<Pick<...>> ---");
console.log(patchUser(utilUser, { name: "Updated" }));

// Required + Pick: Required subset
type UserRequiredFields = Required<Pick<UtilUser, "id" | "name">>;
// { id: number; name: string }

// Omit + Record: Map of users without sensitive fields
type SafeUser = Omit<UtilUser, "email">;
type UserMap = Record<string, SafeUser>;

const safeUsers: UserMap = {
  "u1": { id: 1, name: "Alice", age: 28, isActive: true },
  "u2": { id: 2, name: "Bob", age: 32, isActive: false },
};

console.log("\n--- Combined: Record<Omit<...>> ---");
console.log(safeUsers);

// Readonly + Pick: Immutable subset
type ReadonlyPreview = Readonly<Pick<UtilUser, "id" | "name">>;

const preview2: ReadonlyPreview = { id: 1, name: "Alice" };
console.log("\n--- Combined: Readonly<Pick<...>> ---");
console.log(preview2);

// Exclude + keyof: Non-function keys
type NonFunctionKeys = Exclude<keyof UtilUser, keyof { toString(): string }>;
// "id" | "name" | "email" | "age" | "isActive" | "address"

console.log("\n--- Combined: Exclude<keyof...> ---");
const keys: NonFunctionKeys[] = ["id", "name", "email"];
console.log(keys);

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================

// API Response types
interface UtilApiResponse<T> {
  data: T;
  meta: {
    timestamp: string;
    version: string;
  };
}

type UtilUserResponse = UtilApiResponse<UtilUser>;
type UtilUsersResponse = UtilApiResponse<UtilUser[]>;

// Make response data optional for loading states
type OptionalUserResponse = Partial<UtilUserResponse>;

const loadingResponse: OptionalUserResponse = { meta: { timestamp: "2024-01-01", version: "1.0" } };
const successResponse: UtilUserResponse = {
  data: utilUser,
  meta: { timestamp: "2024-01-01", version: "1.0" },
};

console.log("\n--- Practical: API Responses ---");
console.log("Loading:", loadingResponse);
console.log("Success:", successResponse);

// Form types with utility types
interface UtilFormFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FormErrors = Partial<Record<keyof UtilFormFields, string>>;
// { username?: string; email?: string; password?: string; confirmPassword?: string }

type FormTouched = Record<keyof UtilFormFields, boolean>;

const initialErrors: FormErrors = {};
const initialTouched: FormTouched = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

console.log("\n--- Practical: Form Handling ---");
console.log("Errors:", initialErrors);
console.log("Touched:", initialTouched);

// Configuration with defaults
interface UtilConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  enableCache: boolean;
}

type PartialConfig = Partial<UtilConfig>;
type RequiredConfig = Required<UtilConfig>;

const defaultConfig: RequiredConfig = {
  apiUrl: "https://api.default.com",
  timeout: 5000,
  retries: 3,
  enableCache: true,
};

function mergeConfig(userConfig: PartialConfig): RequiredConfig {
  return { ...defaultConfig, ...userConfig };
}

console.log("\n--- Practical: Config Merge ---");
console.log(mergeConfig({ timeout: 10000 }));
console.log(mergeConfig({ apiUrl: "https://custom.api.com", enableCache: false }));

// ==========================================
// ADVANCED: NonNullable, ConstructorParameters, InstanceType
// ==========================================

// NonNullable<T> - Remove null/undefined
type MaybeUser = UtilUser | null | undefined;
type DefiniteUser = NonNullable<MaybeUser>;
// UtilUser

console.log("\n--- NonNullable<T> ---");
const definite: DefiniteUser = utilUser;
// const nullable: DefiniteUser = null; // Error

// ConstructorParameters<T> - Parameters of constructor
class UtilProduct {
  constructor(public name: string, public price: number, public category: string) {}
}

type ProductConstructorParams = ConstructorParameters<typeof UtilProduct>;
// [name: string, price: number, category: string]

const productParams: ProductConstructorParams = ["Laptop", 999, "Electronics"];
const product = new UtilProduct(...productParams);
console.log("\n--- ConstructorParameters<T> ---");
console.log(product);

// InstanceType<T> - Instance type of constructor
type ProductInstance = InstanceType<typeof UtilProduct>;
// UtilProduct

function createInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
  return new ctor(...args);
}

const product2 = createInstance(UtilProduct, "Phone", 599, "Electronics");
console.log("\n--- InstanceType<T> ---");
console.log(product2);

// ThisType<T> - Contextual typing for methods
interface UtilCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const utilCounter: UtilCounter & ThisType<UtilCounter> = {
  count: 0,
  increment() { this.count++; },
  decrement() { this.count--; },
};

console.log("\n--- ThisType<T> ---");
console.log("Initial:", utilCounter.count);
utilCounter.increment();
utilCounter.increment();
console.log("After increment:", utilCounter.count);