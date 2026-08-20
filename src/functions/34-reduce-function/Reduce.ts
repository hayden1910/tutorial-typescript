// .reduce() = reduce the element of an array to a single value

const prices: number[] = [5, 30, 10, 25, 15, 20];

const total = prices.reduce(sum);

console.log(`$${total.toFixed(2)}`);

function sum(accumulator: number, element: number): number {
    return accumulator + element;
}

//////

const grades: number[] = [75, 50, 90, 80, 65, 95];

const maximum = grades.reduce(getMax);

console.log(maximum);

function getMax(accumulator: number, element: number): number {
    return Math.max(accumulator, element);
}
export { };
