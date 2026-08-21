// ==========================================
// GENERICS - Generic Functions
// ==========================================

// Basic generic function
function identity<T>(value: T): T {
  return value;
}

console.log("--- Basic Generics ---");
console.log(identity<string>("hello"));
console.log(identity<number>(42));
console.log(identity<boolean>(true));
console.log(identity({ name: "Alex", age: 28 }));

// Generic function with multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log("\n--- Multiple Type Parameters ---");
console.log(pair("id", 101));
console.log(pair(1, "one"));
console.log(pair(true, { active: true }));

// Generic function with constraint (extends)
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log("\n--- Constraints (extends) ---");
console.log(getLength("hello"));
console.log(getLength([1, 2, 3]));
console.log(getLength({ length: 10, value: "test" }));
// getLength(123); // Error: number has no length

// Generic function with default type parameter
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

console.log("\n--- Default Type Parameter ---");
console.log(createArray(3, "default"));
console.log(createArray<number>(3, 0));
console.log(createArray(3, true));

// Practical: Generic API response wrapper
interface GenApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function fetchUser(id: number): GenApiResponse<{ id: number; name: string }> {
  return {
    data: { id, name: `User ${id}` },
    status: 200,
    message: "OK",
  };
}

function genFetchUsers(): GenApiResponse<Array<{ id: number; name: string }>> {
  return {
    data: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    status: 200,
    message: "OK",
  };
}

console.log("\n--- Practical: API Response ---");
console.log(fetchUser(1));
console.log(genFetchUsers());

// Generic with Promise
async function genFetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

// Usage would be: genFetchData<User>("/api/user/1")

// Generic Map/Record utility
function toRecord<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T> {
  return arr.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
}

interface GenProduct {
  id: string;
  name: string;
  price: number;
}

const products: GenProduct[] = [
  { id: "p1", name: "Laptop", price: 999 },
  { id: "p2", name: "Mouse", price: 29 },
];

console.log("\n--- Practical: Array to Record ---");
console.log(toRecord(products, "id"));

// Generic filter with predicate
function filterBy<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

console.log("\n--- Generic Filter ---");
const numbers = [1, 2, 3, 4, 5, 6];
console.log(filterBy(numbers, (n) => n % 2 === 0));
console.log(filterBy(products, (p) => p.price > 100));