const myButton = document.getElementById("myButton") as HTMLElement;
const myImg = document.getElementById("myImg") as HTMLElement;

myButton.addEventListener("click", (event: MouseEvent) => {
    if (myImg.style.visibility === "hidden") {
        myImg.style.visibility = "visible";
        myButton.textContent = "Hide";
    }
    else {
        myImg.style.visibility = "hidden"
        myButton.textContent = "Show";
    }
});
export {};
