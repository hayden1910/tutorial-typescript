// classList =  Element property in JS used to interact with
//              an element's list of classes (CSS classes)
//              Allows you to make reusable classes for many elements
//              across your webpage.
// add()
// remove()
// toggle(remove if present, add if not)
// replace(oldClass, newClass)
// contains()
const myButton = document.getElementById("myButton");
myButton.classList.add("enabled");
myButton.addEventListener("click", (event) => {
    if (event.target.classList.contains("disabled")) {
        event.target.textContent += "😲";
    }
    else {
        event.target.classList.replace("enabled", "disabled");
    }
});
export {};
//# sourceMappingURL=67-ClassLists.js.map