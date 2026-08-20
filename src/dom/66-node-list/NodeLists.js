// NodeList =   Static collection of HTML elements by (id, class, element)
//              Can be created by using querySelectorAll()
//              Similar to an array, but no (map, filter, reduce)
//              NodeList won't update to automatically reflect changes
let buttons = document.querySelectorAll(".myButtons");
// Add html/css properties
// buttons.forEach(button => {
//     button.style.backgroundColor = "green";
//     button.textContent += "😁";
// });
// click event listener
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.target.style.backgroundColor = "tomato";
    });
});
// MouseOver + MouseOut event listener
buttons.forEach(button => {
    button.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "wheat";
    });
});
buttons.forEach(button => {
    button.addEventListener("mouseout", (event) => {
        event.target.style.backgroundColor = "green";
    });
});
// Add an element
const newButton = document.createElement("button"); // Step 1
newButton.textContent = "Button 5"; // Step 2
newButton.classList.add("myButtons");
document.body.appendChild(newButton); // Step 3
console.log(buttons);
buttons = document.querySelectorAll(".myButtons");
console.log(buttons);
// Remove an element
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.target.remove();
        buttons = document.querySelectorAll(".myButtons");
        console.log(buttons);
    });
});
export {};
//# sourceMappingURL=66-NodeLists.js.map