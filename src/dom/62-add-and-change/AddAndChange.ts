// EXAMPLE 2: <li>

// STEP 1: Create the element
const newListItem = document.createElement("li");

// STEP 2: Add attributes / properties
newListItem.textContent = "coconut";
newListItem.id = "coconut";
newListItem.style.fontWeight = "bold";
newListItem.style.backgroundColor = "lightgreen";

// STEP 3: Append element to DOM
// document.body.prepend(newListItem);
// document.body.append(newListItem);
(document.getElementById("fruits") as HTMLElement).prepend(newListItem);
// (document.getElementById("fruits") as HTMLElement).append(newListItem);

// const orange = document.getElementById("orange");
// (document.getElementById("fruits") as HTMLElement).insertBefore(newListItem, orange);

// const listItems = document.querySelectorAll("#fruits li"); // pretent don't have id
// document.getElementById("fruits").insertBefore(newListItem, listItems[2]);


// REMOVE HTML element
// (document.getElementById("fruits") as HTMLElement).removeChild(newListItem);

export { };
