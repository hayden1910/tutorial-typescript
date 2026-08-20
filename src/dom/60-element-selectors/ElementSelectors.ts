
// Element Selectors =  Mehthod used to target and manipulate HTML elements
//                      They allow you to select one or multiple HTML elements 
//                      from the DOM 

// 1. document.getElementById();          // ELEMENT OR NULL
const myHeading = document.getElementById("my-heading");
// myHeading.style.backgroundColor = "yellow";
// myHeading.style.textAlign = "center";
// console.log(myHeading);

// 2. document.getElementsByClassName();  // HTML COLLECTION (it's similar to an Array but NOT technically the same)
const fruits = document.getElementsByClassName("fruits") as HTMLCollectionOf<HTMLElement>;
// fruits[0].style.backgroundColor = 'gray' 

// for (let fruit of fruits){
//     fruit.style.backgroundColor = 'gray'
// }

Array.from(fruits).forEach(fruit => {
    fruit.style.backgroundColor = 'gray';
});

// 3. document.getElementsByTagName();    // HTML COLLECTION
const h4Elements = document.getElementsByTagName("h4");
const listElements = document.getElementsByTagName("li");
// h4Elements[0].style.backgroundColor = 'orange'

for (let h4Element of h4Elements) {
    h4Element.style.backgroundColor = 'orange';
}

Array.from(listElements).forEach(listElement => {
    listElement.style.backgroundColor = 'lightgreen';
});

// 4. document.querySelector();           // FIRST ELEMENT OR NULL
const element = document.querySelector(".fruits") as HTMLElement;
element.style.backgroundColor = 'coral';

// 5. document.querySelectorAll();        // NODELIST
const foods = document.querySelectorAll("li");
// foods[0].style.backgroundColor = 'red';

// foods.forEach(food => {
//     food.style.backgroundColor = 'red';
// })

export { };
