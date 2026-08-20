// rest parameters = (...rest) allow a function work with a variable
//                      number of arguments by building them into an array
//                      spread = expands an array into seperate elements 
//                      rest = bundles seperate elements into an array

const food1 = "pizza";
const food2 = "hamburger";
const food3 = "hotdog";
const food4 = "sushi";
const food5 = "ramen";

//spread
function openFridge(...foods: string[]): void {
    console.log(...foods)
}
openFridge(food1, food2, food3, food4, food5);

//rest
function getFood(...foods: string[]): string[] {
    return foods;
}
const foods = getFood(food1, food2, food3, food4, food5);
console.log(foods);

///////////////////////////////////////////////
function sum(...numbers: number[]): number {
    let result = 0;
    for (let number of numbers) {
        result += number;
    }
    return result;
}
const total = sum(1, 2, 3, 4, 5)
console.log(`Your total is $${total}`);

///////////////////////////////////////////////
function getAverage(...numbers: number[]): number {
    let result = 0;
    for (let number of numbers) {
        result += number;
    }
    return result / numbers.length;
}
let avg = getAverage(1, 2, 3, 4)
console.log(`Your total is $${avg}`);

///////////////////////////////////////////////
function combineStrings(...strings: string[]): string {
    return strings.join(" ");
}
const fullName = combineStrings("Mr.", "Spongebob", "Squarepants", "III");
console.log(fullName);

export { };
