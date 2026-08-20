"use strict";
const calcDisplay = document.getElementById("display");
function appendToDisplay(input) {
    calcDisplay.value += input;
}
function allClearDisplay() {
    calcDisplay.value = "";
}
function clearDisplay() {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
}
function calculate() {
    try {
        const sanitizedInput = calcDisplay.value.replace(/x/g, '*');
        calcDisplay.value = eval(sanitizedInput);
    }
    catch (error) {
        calcDisplay.value = "Error";
    }
}
//# sourceMappingURL=calculator.js.map