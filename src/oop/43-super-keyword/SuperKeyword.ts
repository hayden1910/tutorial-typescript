// super = keyword is used in classes to call the constructor or 
//         access the properties and methods of a parent (superclass)
//         this = this object
//         super = the parent

class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    move(speed: number): void {
        console.log(`The ${this.name} moves at a speed of ${speed}km`);
    }
}

class Rabbit extends Animal {
    runSpeed: number;

    constructor(name: string, age: number, runSpeed: number) {
        super(name, age);
        this.runSpeed = runSpeed;
    }
    run(): void {
        console.log(`This ${this.name} can run`);
        super.move(this.runSpeed);
    }
}

class Fish extends Animal {
    swimSpeed: number;

    constructor(name: string, age: number, swimSpeed: number) {
        super(name, age);
        this.swimSpeed = swimSpeed;
    }
    swim(): void {
        console.log(`This ${this.name} can swim`);
        super.move(this.swimSpeed);
    }
}

class Hawk extends Animal {
    flySpeed: number;

    constructor(name: string, age: number, flySpeed: number) {
        super(name, age);
        this.flySpeed = flySpeed;
    }
    fly(): void {
        console.log(`This ${this.name} can fly`);
        super.move(this.flySpeed);
    }
}

const rabbit = new Rabbit("BugBunny", 1, 25);
const fish = new Fish("Nemo", 2, 12);
const hawk = new Hawk("Daffy", 3, 50);

console.log(fish.name);
console.log(fish.age);
console.log(fish.swimSpeed);

rabbit.run();
fish.swim();
hawk.fly();

export { };
