//type conversion = change the datatype of a value to another
//                  (string, number, boolean)

// let age = window.prompt("How old are you?");
// // age = Number(age);
// console.log(age, typeof age);

let x: number | undefined;
let y: string | undefined;
let z: string | boolean = "";

x = Number(x);
y = String(y);
z = Boolean(z);

console.log(x, typeof x);
console.log(y, typeof y);
console.log(z, typeof z);

export { };
