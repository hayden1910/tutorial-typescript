// synchronous =    Executes line by line consecutively in a sequential manner
//                  Code that waits for an operation to complete

// asynchronous =   Allows multiple operations to be perfomed concurrently without waiting
//                  Doesn't block the execution flow and allows the program to continue
//                  (I/O operations, network requests, fetching data)
//                  Handled with: Callbacks, Promises, Async/Await

function func1(callbacks: () => void): void {
    setTimeout(() => {
        console.log("Task 1");
        callbacks()
    }, 3000);
}

function func2(): void {
    console.log("Task 2");
    console.log("Task 3");
    console.log("Task 4");
}

func1(func2);

export { };
