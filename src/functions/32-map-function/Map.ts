// .map = accept a callback and applies that function 
//        to each element of an array, then RETURN A NEW ARRAY

const numbers: number[] = [1, 2, 3, 4, 5];
const squares = numbers.map(square);
const cubes = numbers.map(cube);

console.log(squares);
console.log(cubes);

function square(element: number): number {
    return Math.pow(element, 2)
}

function cube(element: number): number {
    return Math.pow(element, 3)
}

/////

const students: string[] = ["Spongebob", "Patrick", "Squidward", "Sandy"];
const studentsUpper = students.map(upperCase);
const studentsLower = students.map(lowerCase);

console.log(studentsUpper);
console.log(studentsLower);

function upperCase(element: string): string {
    return element.toUpperCase();
}

function lowerCase(element: string): string {
    return element.toLowerCase();
}

/////

const dates: string[] = ["2024-1-10", "2025-2-20", "2026-3-30"];

const formattedDates = dates.map(formatDates);

console.log(formattedDates)

function formatDates(element: string): string {
    const parts = element.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export { };
