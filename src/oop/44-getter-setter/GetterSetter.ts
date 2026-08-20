// getter = special method that makes a property readable
// setter = special method that makes a property writeable
//
// validate and modify a value when reading/writing a property

class Rectangle {
    private _width!: number;
    private _height!: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    set width(newWidth: number) {
        if (newWidth > 0) {
            this._width = newWidth  //underscore "_" mean private
        }
        else {
            console.error("Width must be a possitive number");
        }
    }

    set height(newHeight: number) {
        if (newHeight > 0) {
            this._height = newHeight  //underscore "_" mean private
        }
        else {
            console.error("Height must be a possitive number");
        }
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get area(): number {
        return this._height * this._width;
    }
}

const rectangle = new Rectangle(12, 2);

rectangle.width = 4;
// rectangle.height = -7;

console.log(rectangle.width);
console.log(rectangle.height);
console.log(rectangle.area);

//////

class Person {
    private _firstName!: string;
    private _lastName!: string;
    private _age!: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    set firstName(newFirstName: string) {
        if (typeof newFirstName === "string" && newFirstName.length > 0) {
            this._firstName = newFirstName;
        } else {
            console.error("First name must be a non-empty string");
        }
    }
    set lastName(newLastName: string) {
        if (typeof newLastName === "string" && newLastName.length > 0) {
            this._lastName = newLastName;
        } else {
            console.error("Last name must be a non-empty string");
        }
    }
    set age(newAge: number) {
        if (typeof newAge === "number" && newAge >= 0) {
            this._age = newAge;
        } else {
            console.error("Age must be a non-negative number");
        }
    }

    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get fullName(): string {
        return this._firstName + " " + this._lastName;
    }
    get age(): number {
        return this._age;
    }
}

// const person = new Person(420, 69, "pizza");
const person = new Person("Spongebob", "Squarepants", 30);

console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName);
console.log(person.age);

export { };
