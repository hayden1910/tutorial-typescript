"use strict";
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const countLabel = document.getElementById("countLabel");
let count = 0;
increaseBtn.onclick = function () {
    count++;
    countLabel.textContent = count.toString();
};
decreaseBtn.onclick = function () {
    count--;
    countLabel.textContent = count.toString();
};
resetBtn.onclick = function () {
    count = 0;
    countLabel.textContent = count.toString();
};
//# sourceMappingURL=counter.js.map