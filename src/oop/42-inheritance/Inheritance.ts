// inheritance = allows a new class to inherit properties and methods 
//               from an existing class (parent -> child)
//               helps with code reuseability

class Animal {
    alive: boolean = true;
    name!: string;

    eat(): void {
        console.log(`This ${this.name} is eating`);
    }
    sleep(): void {
        console.log(`This ${this.name} is sleeping`);
    }
}
class Rabbit extends Animal {
    name = 'rabbit';

    run(): void {
        console.log(`This ${this.name} is running`);
    }
}
class Fish extends Animal {
    name = 'fish';

    swim(): void {
        console.log(`This ${this.name} is swimming`);
    }
}
class Hawk extends Animal {
    name = 'hawk';

    fly(): void {
        console.log(`This ${this.name} is flying`);
    }
}

const rabbit = new Rabbit();
const fish = new Fish();
const hawk = new Hawk();

console.log(rabbit.alive);
rabbit.eat();
rabbit.run();
fish.swim();
hawk.fly();

export { };
