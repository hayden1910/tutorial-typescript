// spread operator = ... allows an iterable such as an 
//                   array or string to be expanded
//                   into seperate elements
//                   (unpacks the elements)

let numbers: number[] = [1, 2, 3, 4, 5];
// let maximum = Math.max(numbers); //  => NaN
let maximum = Math.max(...numbers);
console.log("max num: " + maximum);

let username = "Hayden ";
let letters = [...username].join("-");
console.log(letters);

let fruits: string[] = ['mangosteen', 'pineapple', 'lychee'];
let vegetables: string[] = ['carrot', 'celery', 'potatores'];
let foods: string[] = [...fruits, ...vegetables, 'eggs', 'milk'];
console.log(foods);

export { };
