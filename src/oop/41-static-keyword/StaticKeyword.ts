// static = keyword the defines properties or methods that belong 
//          to a class itself rather than the objects created 
//          from that class (class owns anything static, not the objects)

class MathUtil {
    static PI: number = 3.14159;
    static getDiameter(radius: number): number {
        return radius * 2;
    }
    static getCircumference(radius: number): number {
        return 2 * this.PI * radius;
    }
    static getArea(radius: number): number {
        return this.PI * radius * radius;
    }
}

// const MathUtil1 = new MathUtil();
// console.log(MathUtil1.PI)    ---> undefined

console.log(MathUtil.PI) //type the name of the class
console.log(MathUtil.getDiameter(10));
console.log(MathUtil.getCircumference(10));
console.log(MathUtil.getArea(10));

//////
class User {

    static userCount: number = 0;

    username: string;

    constructor(username: string) {
        this.username = username;
        User.userCount++;
    }
    static getUserCount(): void {
        console.log(`There are ${User.userCount} users online`);
    }
    sayHello(): void {
        console.log(`Hello, my username is ${this.username}`)
    }
}

const user1 = new User("Spongebob");
const user2 = new User("Patrick");
const user3 = new User("Sandy");

console.log(user1.username);
// console.log(user1.userCount);    ---> undefined
console.log(User.userCount);

// user1.sayHello();
// user2.sayHello();
// user3.sayHello();
User.getUserCount();

function greetAllUsers(users: User[]): void {
    users.forEach(user => user.sayHello());
}

const userList = [user1, user2, user3];
greetAllUsers(userList);

export { };
