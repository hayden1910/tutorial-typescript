//Math =    built-in object that provides a
//          collection of properties and methods

// console.log(Math.PI);
// console.log(Math.E); //euler's number

let x: number = 3.21;
let y: number = 22;
let z: number = 12;

z = Math.round(x);      //auto
// z = Math.floor(x);   //round down
// z = Math.ceil(x);    //round up
// z = Math.trunc(x);   //truncate - removing the decimal part.
// z = Math.pow(3, 2);  //power
// z = Math.sqrt(x);    //square
// z = Math.log(x);
// z = Math.sin(x);
// z = Math.cos(x);
// z = Math.tan(x);
// z = Math.abs(x);     //absolute value
// z = Math.sign(x);    //retuns whether a number is negative, positive or zero.
let maxNum: number = Math.max(x, y, z);

console.log(maxNum);

export { };
