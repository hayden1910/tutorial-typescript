// Object = a collection of related properties and methods
//          Can represent real world objects (people, products, places)
//          object = {key: value, 
//                         function()}

const person1 = {
    firstName: "Spongebob",
    lastName: "Squarepants",
    age: 30,
    isEmployed: true,
    sayHello: function () { console.log("Hi, I'm Spongebob") },
}

const person2 = {
    firstName: "Patrick",
    lastName: "Star",
    age: 43,
    isEmployed: false,
    sayHello: () => console.log("Hi, I'm Patrick"),
}

console.log(person1);
console.log(person1.firstName);
console.log(person1.lastName);
console.log(person1.age);
console.log(person1.isEmployed);
person1.sayHello();

console.log(person2);

export { };
