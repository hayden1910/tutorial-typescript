// nested objects = Object inside of other Objects.
//                  Allows you to represent more complex data structures
//                  Child Object is enclosed by a Parent Object

//                  Person{Address{}}, ContactInfo{}}
//                  ShoppingCart{Keyboard{}, Mouse{}, Monitor{}}

const person = {
    fullName: "Spongebob Squarepants",
    age: 30,
    isStudent: true,
    hobbies: ['karate', 'jellyfishing', 'cooking'],
    address: {
        street: '123 Conch St.',
        city: 'Bikini Bottom',
        country: 'Int. Water'
    }
}

// console.log(person.fullName);
// console.log(person.age);
// console.log(person.isStudent);
// console.log(person.hobbies[2]);
// console.log(person.address.street);

// for (const property in person.address) {
//     console.log(person.address[property]);
// }

class Address {
    street: string;
    city: string;
    country: string;

    constructor(street: string, city: string, country: string) {
        this.street = street;
        this.city = city;
        this.country = city;
    }
}

class Person {
    name: string;
    age: number;
    address: Address;

    constructor(name: string, age: number, ...address: [string, string, string]) {
        this.name = name;
        this.age = age;
        this.address = new Address(...address);
    }
}

const person1 = new Person("Michael De Santa", 48, "124 Portola Drive St.", "Los Santos", "USA");
const person2 = new Person("Franklin Clinton", 25, "3671 Whispymound Drive St.", "Los Santos", "USA");
const person3 = new Person("Trevor Philips", 43, "Amarillo Vista, El Burro Heights", "Los Santos", "Canada");

console.log(person3.address.street);

export { };
