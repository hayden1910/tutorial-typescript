const decreaseBtn = document.getElementById("decreaseBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const increaseBtn = document.getElementById("increaseBtn") as HTMLButtonElement;
const countLabel = document.getElementById("countLabel") as HTMLLabelElement;

let count = 0;

increaseBtn.onclick = function () {
    count++;
    countLabel.textContent = count.toString();
}
decreaseBtn.onclick = function () {
    count--;
    countLabel.textContent = count.toString();
}
resetBtn.onclick = function () {
    count = 0;
    countLabel.textContent = count.toString();
}