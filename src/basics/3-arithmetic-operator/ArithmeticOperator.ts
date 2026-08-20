// ==========================================
// 1. BASIC ARITHMETIC OPERATORS
// ==========================================
const a: number = 20;
const b: number = 6;

const addition: number = a + b;        // 26
const subtraction: number = a - b;     // 14
const multiplication: number = a * b;  // 120
const division: number = a / b;        // 3.3333333333333335
const modulus: number = a % b;         // 2 (Remainder of 20 / 6)
const exponentiation: number = a ** b; // 64000000 (20 to the power of 6)

// ==========================================
// 2. INCREMENT & DECREMENT
// ==========================================
let counter: number = 5;

let postIncrement = counter++; // Assigns 5, then counter becomes 6
let preIncrement = ++counter;  // Increment counter to 7, then assigns 7

let postDecrement = counter--; // Assigns 7, then counter becomes 6
let preDecrement = --counter;  // Decrement counter to 5, then assigns 5

// ==========================================
// 3. COMPOUND ASSIGNMENT OPERATORS
// ==========================================
let total: number = 50;

total += 10; // total = total + 10 (60)
total -= 5;  // total = total - 5  (55)
total *= 2;  // total = total * 2  (110)
total /= 10; // total = total / 10 (11)
total %= 4;  // total = total % 4  (3)

// ==========================================
// 4. TYPE CHECKING & STRING CONCATENATION
// ==========================================
// Note: + operator concatenates if one operand is a string
const price: number = 100;
const taxRate: number = 0.1;
const totalPrice: number = price + price * taxRate; // 110

const label: string = "Total: " + totalPrice; // "Total: 110"

// ==========================================
// PRINT ALL VALUES TO CONSOLE
// ==========================================
console.log("--- Basic Operations ---");
console.log(`${a} + ${b} = ${addition}`);
console.log(`${a} - ${b} = ${subtraction}`);
console.log(`${a} * ${b} = ${multiplication}`);
console.log(`${a} / ${b} = ${division}`);
console.log(`${a} % ${b} = ${modulus}`);
console.log(`${a} ** ${b} = ${exponentiation}\n`);

console.log("--- Increment & Decrement ---");
console.log(`Final counter value: ${counter}`);
console.log(`Post-increment result: ${postIncrement}`);
console.log(`Pre-increment result: ${preIncrement}\n`);

console.log("--- Compound & String Formatting ---");
console.log(`Calculated Total: ${total}`);
console.log(label);