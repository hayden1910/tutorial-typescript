//callback = a function that is passed as an argument 
//           to another function

//          used to handle asynchronous operations:
//          1. Reading a file
//          2. Network requests
//          3. Interacing with databases

// "Hey, when you're done, call this next."

sum(displayConsole, 1, 2);

function sum(callback: (result: number) => void, x: number, y: number): void {
    let result = x + y; //after calculate
    callback(result);   //run the callback
}

function displayConsole(result: number): void {
    console.log(result);
}

export { };
