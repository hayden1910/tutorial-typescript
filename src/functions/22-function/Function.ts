//   function =  a section of reuseable code.
//               Declare code once, use it wherever you want
//               Call the function to execute that code

function happyBirthday(username: string, age: number): void {
    // parameter
    console.log("Happy birthday to you");
    console.log("Happy birthday to you");
    console.log(`Happy birthday dear ${username}`);
    console.log("Happy birthday to you");
    console.log(`You are ${age} years old`);
}
happyBirthday("Hendrick", 25); // arguments

function add(x: number, y: number): number {
    //  let result = x + y;
    //  return result;
    return x + y;
}
console.log(add(2, 3)); // print a result without variable

export { };
