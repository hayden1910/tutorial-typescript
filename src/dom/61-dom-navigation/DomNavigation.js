// DOM Navigation = The process of navgating through the structure
//                  of an HTML document using JavaScript
// .firstElementChild
const element1 = document.getElementById("vegetables");
const firstChild = element1.firstElementChild;
firstChild.style.background = "yellow";
const ulElement1 = document.querySelectorAll("ul");
ulElement1.forEach(ulElement1 => {
    const firstChild = ulElement1.firstElementChild;
    firstChild.style.background = "green";
});
// .lastElementChild
const element2 = document.getElementById("vegetables");
const lastChild = element2.lastElementChild;
lastChild.style.background = "yellow";
const ulElement2 = document.querySelectorAll("ul");
ulElement2.forEach(ulElement2 => {
    const lastChild = ulElement2.lastElementChild;
    lastChild.style.background = "red";
});
// .nextElementSibling
const element3 = document.getElementById("fruits");
const nextSibling = element3.nextElementSibling;
nextSibling.style.backgroundColor = "lime";
// .previousElementSibling
const element4 = document.getElementById("vegetables");
const preSibling = element4.previousElementSibling;
preSibling.style.backgroundColor = "lightblue";
// .parentElement
const element5 = document.getElementById("pie");
const parent = element5.parentElement;
parent.style.backgroundColor = "wheat";
// .children
const element6 = document.getElementById("desserts");
const children = element6.children;
Array.from(children).forEach(child => {
    child.style.backgroundColor = "yellow";
});
children[1].style.backgroundColor = "purple";
export {};
//# sourceMappingURL=61-DOM_Navigation.js.map