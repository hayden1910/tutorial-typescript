// ==========================================
// 1. VARIABLE DECLARATIONS
// ==========================================
let username: string = "Alex";
let age: number = 28;
let isActive: boolean = true;
let count = 10;
const API_URL: string = "https://api.example.com";

// ==========================================
// 2. COMMON TYPES & UNIONS
// ==========================================
let scores: number[] = [90, 85, 100];
let tags: Array<string> = ["typescript", "javascript"];

let userId: string | number = "usr_101";

let flexibleData: any = "Hello from 'any'";
let inputData: unknown = "Some payload";

// ==========================================
// 3. OBJECTS & TUPLES
// ==========================================
interface User {
  readonly id: number;
  name: string;
  email?: string;
}

const user: User = {
  id: 1,
  name: "Sarah"
};

let httpResponse: [number, string] = [200, "OK"];

// ==========================================
// PRINT ALL VALUES TO CONSOLE
// ==========================================
console.log("--- Basic Variables ---");
console.log(`Username: ${username}, Age: ${age}, Active: ${isActive}`);
console.log(`Count: ${count}`);
console.log(`API URL: ${API_URL}\n`);

console.log("--- Arrays & Unions ---");
console.log(`Scores: ${scores.join(", ")}`);
console.log(`Tags: ${tags.join(", ")}`);
console.log(`User ID: ${userId}`);
console.log(`Flexible Data: ${flexibleData}`);

if (typeof inputData === "string") {
  console.log(`Input Data (Uppercase): ${inputData.toUpperCase()}\n`);
}

console.log("--- Object & Tuple ---");
console.log(`User Object: ID=${user.id}, Name=${user.name}`);
console.log(`HTTP Response: Status=${httpResponse[0]}, Message=${httpResponse[1]}`);