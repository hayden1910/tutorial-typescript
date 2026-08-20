// IF STATEMENTS =  if a condition is true, execute some code 
//                  if not, do something else

let time: number = 9;
if (time < 12) {
    console.log("Good morning");
}
else {
    console.log("Good afternoon");
}

// if statement work really well with boolean variable
let isStudent: boolean = false;
if (isStudent) {
    console.log("You are a student");
}
else {
    console.log("You are NOT a student");
}

// DOM
const myText = document.getElementById("myText") as HTMLInputElement;
const mySubmit = document.getElementById("mySubmit") as HTMLButtonElement;
const resultElement = document.getElementById("resultElement") as HTMLElement;

let age: number | string;
mySubmit.onclick = function () {
    age = myText.value;
    age = Number(age);
    if (age >= 100) {
        resultElement.textContent = "You are TOO OLD to enter this site"
    }
    else if (age >= 18) {
        resultElement.textContent = "You are old enough to enter this site"
    }
    else if (age == 0) {
        resultElement.textContent = "You can't enter. You were just born"

    }
    else if (age < 0) {
        resultElement.textContent = "You age can't be below 0"

    }
    else {
        resultElement.textContent = "You must be 18+ to enter this site";
    }
}

export { };
