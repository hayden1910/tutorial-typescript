//   variable scope =   where a variable is recognized
//                      and accessible (local vs global)

let x = 3; //not reccommended to declare global variables in a large program (naming conflict)

function1();

function function1(): void {
    // let x = 1;
    console.log(x);
}

function function2(): void {
    let x = 2;
    console.log(x);
}

export { };
