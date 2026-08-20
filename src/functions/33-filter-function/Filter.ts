// .filter() = accept a new array by filtering out elements

let numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
let evenNums = numbers.filter(isEven);
let oddNums = numbers.filter(isOdd);

console.log(evenNums);
console.log(oddNums);

function isEven(element: number): boolean {
    return element % 2 === 0;
}

function isOdd(element: number): boolean {
    return element % 2 !== 0;
}

//////

const ages: number[] = [16, 17, 18, 18, 19, 20, 31];
const adult = ages.filter(isAdult);
const children = ages.filter(isChild);

console.log(adult);
console.log(children);

function isAdult(element: number): boolean {
    return element >= 18;
}

function isChild(element: number): boolean {
    return element < 18;
}

//////

const words: string[] = ["apple", "orange", "banana", "kiwi", "pomeggranate", "coconut"];
const shortWords = words.filter(getShortWords);
const longWords = words.filter(getLongWords);

console.log(shortWords);
console.log(longWords);

function getShortWords(element: string): boolean {
    return element.length <= 6;
}

function getLongWords(element: string): boolean {
    return element.length > 6;
}
export { };
