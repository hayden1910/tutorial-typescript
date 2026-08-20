// DOM Navigation = The process of navgating through the structure
//                  of an HTML document using JavaScript

// .firstElementChild
const element1 = document.getElementById("vegetables") as HTMLElement;
const firstChild = element1.firstElementChild as HTMLElement;
firstChild.style.background = "yellow";


const ulElement1 = document.querySelectorAll("ul");

ulElement1.forEach(ulElement1 => {
    const firstChild = ulElement1.firstElementChild as HTMLElement;
    firstChild.style.background = "green";
})

// .lastElementChild
const element2 = document.getElementById("vegetables") as HTMLElement;
const lastChild = element2.lastElementChild as HTMLElement;
lastChild.style.background = "yellow";


const ulElement2 = document.querySelectorAll("ul");

ulElement2.forEach(ulElement2 => {
    const lastChild = ulElement2.lastElementChild as HTMLElement;
    lastChild.style.background = "red";
})

// .nextElementSibling
const element3 = document.getElementById("fruits") as HTMLElement;
const nextSibling = element3.nextElementSibling as HTMLElement;
nextSibling.style.backgroundColor = "lime";

// .previousElementSibling
const element4 = document.getElementById("vegetables") as HTMLElement;
const preSibling = element4.previousElementSibling as HTMLElement;
preSibling.style.backgroundColor = "lightblue";

// .parentElement
const element5 = document.getElementById("pie") as HTMLElement;
const parent = element5.parentElement as HTMLElement;
parent.style.backgroundColor = "wheat";

// .children
const element6 = document.getElementById("desserts") as HTMLElement;
const children = element6.children;

Array.from(children).forEach(child => {
    (child as HTMLElement).style.backgroundColor = "yellow";
});

(children[1] as HTMLElement).style.backgroundColor = "purple";

export { };
