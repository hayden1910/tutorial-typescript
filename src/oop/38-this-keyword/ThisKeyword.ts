// this = reference to the object where this is used
//          (the object depends on the immediate context)
//          person.name = this.name

const person1 = {
    name: "Spongebob",
    favFood: "Hamburger",
    sayHello: function () {
        console.log(`Hi, I'm ${this.name}`);
    },
    eat: function () {
        console.log(`${this.name} is eating ${this.favFood}`);
    },
};

const person2 = {
    name: "Patrick",
    favFood: "Pizza",
    sayHello: function () {
        console.log(`Hi, I'm ${this.name}`);
    },
    eat: function () {
        console.log(`${this.name} is eating ${this.favFood}`);
    },
};

person1.sayHello();
person1.eat();

person2.sayHello();
person2.eat();

// Global 'this' in a Node.js module environment prints an empty object {}
console.log("Global this:", this);