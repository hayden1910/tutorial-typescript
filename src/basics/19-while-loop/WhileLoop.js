//  While loop = repeat some code WHILE some condition is true
let username;
let password;
let loggedIn = false;
// do {
//     username = window.prompt('Enter your name');
// } while (username === "" || username === null)
// console.log(`Hello ${username}`);
while (!loggedIn) {
    username = window.prompt("Enter your username");
    password = window.prompt("Enter your password");
    if (username === "lamhungphan" && password === "123") {
        loggedIn = true;
        console.log("You are logged in");
    }
    else {
        console.log("Invalid credentials! Please try again");
    }
}
export {};
//# sourceMappingURL=19-WhileLoop.js.map