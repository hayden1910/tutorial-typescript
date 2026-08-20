// sort() = method used to sort elements of an array in places.
//          Sorts elements as strings in lexicographic order, not alphabetical
//          lexicographic = (alphabet + numbers + symbols) as strings

type Person = { name: string; age: number; gpa: number; };

const fruits = ["apple", "orange", "banana", "coconut", "pineapple"];
const numbers = [1, 10, 2, 9, 3, 8, 4, 6, 7, 5, 6];
const people: Person[] = [
    { name: "Spongebob", age: 30, gpa: 3.0 },
    { name: "Patrick", age: 37, gpa: 1.5 },
    { name: "Squidward", age: 51, gpa: 2.5 },
    { name: "Sandy", age: 27, gpa: 4.0 }]

fruits.sort();
const lexicographic = numbers.sort();
const orderNum = numbers.sort((a, b) => (a - b));
people.sort((a, b) => b.age - a.age);
const compareByName = people.sort((a, b) => a.name.localeCompare(b.name));

console.log(fruits);
console.log(lexicographic); // 1, 10, 2, 3 ...
console.log(orderNum);
console.log(people);
console.log(compareByName);

export { };
