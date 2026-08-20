// classList =  Element property in JS used to interact with
//              an element's list of classes (CSS classes)
//              Allows you to make reusable classes for many elements
//              across your webpage.

// add()
// remove()
// toggle(remove if present, add if not)
// replace(oldClass, newClass)
// contains()

const myButton = document.getElementById("myButton") as HTMLElement;

myButton.classList.add("enabled");

myButton.addEventListener("click", (event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("disabled")) {
        (event.target as HTMLElement).textContent += "😲";
    } else {
        (event.target as HTMLElement).classList.replace("enabled", "disabled");
    }
})

export { };
