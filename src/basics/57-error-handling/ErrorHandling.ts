// Error =  An Object that is created to represent a problem that occurs
//          Occur often with user input or establishing a connection

// try {}       =   Encloses code that might potentially cause an error
// catch {}     =   Catch and handle any thrown Error from try {}
// finally {}   =   (optional) Always executes. Used mostly for clean up 

declare const x: unknown;

try {
    // console.lig("Hello"); // syntax error
    console.log(x);
    // Network Errors
    // Promise Rejection
    // Security Errors
}
catch (error) {
    console.error(error) // highlight the error
}
finally {
    // Close Files
    // Close Connections
    // Release Resources
    console.log("This always executes");
}

console.log("The end of 1st example");

try {
    const dividend = Number(window.prompt("Enter a dividend: "));
    const divisor = Number(window.prompt("Enter a divisor: "));

    if (divisor == 0) {
        throw new Error("You can't divide by zero");
    }

    if (isNaN(dividend) || isNaN(divisor)) {
        throw new Error("Value must be a number")
    }
    const result = dividend / divisor;
    console.log(result)

} catch (error) {
    console.error(error);
}

console.log("The end of 2nd example");

export { };
