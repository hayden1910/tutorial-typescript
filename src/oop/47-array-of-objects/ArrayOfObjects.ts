type Fruit = { name: string; color: string; calories: number; };

const fruits: Fruit[] = [
    { name: "apple", color: "red", calories: 95 },
    { name: "orange", color: "orange", calories: 45 },
    { name: "banana", color: "yellow", calories: 105 },
    { name: "coconut", color: "white", calories: 159 },
    { name: "pineapple", color: "yellow", calories: 37 }];

fruits.push({ name: "grapes", color: "purple", calories: 62 });

fruits.pop();

// splice will remove elements at certain indices
fruits.splice(2, 1);

// use the forEach method to Loop through the elements of an array
fruits.forEach(fruits => console.log(fruits.calories));
console.log(fruits);

// map() method will run each element through a function and return a new array
const fruitName = fruits.map(fruits => fruits.name);
console.log(fruitName);

// filter() return a new array after using each element and checking a condition
const yellowFruit = fruits.filter(fruit => fruit.color === "yellow");
console.log(yellowFruit);

// reduct() return a single value in array
const maxFruit = fruits.reduce((max, fruit) => fruit.calories > max.calories ? fruit : max);
console.log(maxFruit);

export { };
