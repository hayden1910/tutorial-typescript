// eventListener =  Listen for specific events to create interactive web pages
//                  ents: click, mouseover, mouseout
//                  .addEventListener(event, callback/function);

const myBox = document.getElementById("myBox") as HTMLElement;
const myButton = document.getElementById("myButton") as HTMLElement;

myBox.addEventListener("click", (event: MouseEvent) => {
    (event.target as HTMLElement).style.backgroundColor = "tomato";
    (event.target as HTMLElement).textContent = "OUCH 🤕";
});

myBox.addEventListener("mouseover", (event: MouseEvent) => {
    (event.target as HTMLElement).style.backgroundColor = "yellow";
    (event.target as HTMLElement).textContent = "Don't do it 😱";
});

myBox.addEventListener("mouseout", (event: MouseEvent) => {
    (event.target as HTMLElement).style.backgroundColor = "lightgreen";
    (event.target as HTMLElement).textContent = "Click me 😉";
});

export { };
