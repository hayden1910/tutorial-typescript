// eventListener =  Listen for specific events to create interactive web pages
//                  ents: click, mouseover, mouseout
//                  .addEventListener(event, callback/function);
const myBox = document.getElementById("myBox");
const moveAmount = 50;
let x = 0;
let y = 0;
document.addEventListener("keydown", (event) => {
    myBox.style.backgroundColor = "tomato";
});
document.addEventListener("keydown", (event) => {
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
        switch (event.key) {
            case "ArrowUp":
                y -= moveAmount;
                break;
            case "ArrowDown":
                y += moveAmount;
                break;
            case "ArrowLeft":
                x -= moveAmount;
                break;
            case "ArrowRight":
                x += moveAmount;
                break;
        }
        myBox.style.top = `${y}px`;
        myBox.style.left = `${x}px`;
    }
});
export {};
//# sourceMappingURL=key-event.js.map