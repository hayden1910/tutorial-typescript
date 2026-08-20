//1. window promp
// let username = window.prompt("What's your username?");
// console.log(username);
//2 html textbox
let username;
document.getElementById("mySubmit").onclick = function () {
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username}`;
    console.log(username);
};
export {};
//# sourceMappingURL=AcceptUserInput.js.map