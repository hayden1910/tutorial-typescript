// Arrow functions = a concise way to write function expressions
//                   good for simple functions that you use only once
//                  (parameters) => some code

// Function Declaration
function hello(): void {
    console.log("Hello");
}

hello();

// Function Expression = Anonymous function
const hi = function (): void {
    console.log("Hi");
}

hi();

// Arrow Function (ES6)
const grett = (): void => console.log("Wazzup");
grett();

const gretting = (name: string): void => console.log(`What's up ${name}`);
gretting("Bro");

const uAreOld = (name: string, age: number): void => {
    console.log(`What's up ${name}`)
    console.log(`You are ${age} year old`)
};

uAreOld("Hayden", 25);

setTimeout(hello, 1000);
setTimeout(function (): void { console.log("Anonymous function as param") }, 2000);
setTimeout((): void => console.log("Arrow function as param"), 3000);

console.log("-----------------------------------");

const numbers: number[] = [1, 2, 3, 4, 5, 6];

const squares = numbers.map((element) => Math.pow(element, 2));
const cubes = numbers.map((element) => Math.pow(element, 3));
const evenNums = numbers.filter((element) => element % 2 === 0);
const oddNums = numbers.filter((element) => element % 2 !== 0);
const total = numbers.reduce((accumulator, element) => accumulator + element);

console.log(total);

export { };
