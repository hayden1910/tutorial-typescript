// forEach = method used to iterate over the elements
//           of an array and apply a specified function (callback)
//           to each element

//           array.forEach(callback)
//           element, index, array are provided

let numbers: number[] = [1, 2, 3, 4, 5];

// numbers.forEach(double);
// numbers.forEach(triple);
// numbers.forEach(square);
numbers.forEach(cube);
numbers.forEach(display);

function double(element: number, index: number, array: number[]): void {
    array[index] = element * 2;
}

function triple(element: number, index: number, array: number[]): void {
    array[index] = element * 3;
}

function square(element: number, index: number, array: number[]): void {
    array[index] = Math.pow(element, 2);
}

function cube(element: number, index: number, array: number[]): void {
    array[index] = Math.pow(element, 3);
}

function display<T>(element: T): void {
    console.log(element);
}

console.log("-----------------------------------");

let fruits: string[] = ["APPLE", "orange", "BANANA", "coconut"];

fruits.forEach(capitalize);
fruits.forEach(display);

function upperCase(element: string, index: number, array: string[]): void {
    array[index] = element.toUpperCase();
}

function lowerCase(element: string, index: number, array: string[]): void {
    array[index] = element.toLowerCase();
}

function capitalize(element: string, index: number, array: string[]): void {
    array[index] = element.charAt(0).toUpperCase() + element.slice(1);
}

export { };
