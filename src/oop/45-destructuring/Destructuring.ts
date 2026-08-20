// destructuring =  extract values from arrays and objects,
//                  then assign them to variables in a convenient way
//                  [] = to perform Array destructuring
//                  {} = to perform Object destructuring

// ----------- Example 1 -----------
// Swap the value of two variable

let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a);
console.log(b);

// ----------- Example 2 -----------
// Swap 2 element in an array

const colors = ["red", "green", "blue", "black", "white"];

[colors[0], colors[4]] = [colors[4], colors[0]];

console.log(colors);

// ----------- Example 3 -----------
// Assign array elements to variables

const [firstColor, secondColor, thirdColor, ...extraColors] = colors;

console.log(firstColor);
console.log(secondColor);
console.log(thirdColor);
console.log(extraColors);

// ----------- Example 4 -----------
// Extract values from objects

const person1 = {
    firstName: "Spongebob",
    lastName: "SquarePants",
    age: 30,
    job: "Fry Cook",
}


const person2: { firstName: string; lastName: string; age: number; job?: string } = {
    firstName: "Patrick",
    lastName: "Star",
    age: 34,
}

const { firstName, lastName, age, job = "Unemployed" } = person2;

console.log(firstName);
console.log(lastName);
console.log(age);
console.log(job);

// ----------- Example 5 -----------
// Destructure in function parameters

function displayPerson({ firstName, lastName, age, job }: { firstName: string; lastName: string; age: number; job: string }): void {
    console.log(`name: ${firstName} ${lastName}`);
    console.log(`age: ${age}`);
    console.log(`job: ${job}`);
}

displayPerson(person1);
export { };
