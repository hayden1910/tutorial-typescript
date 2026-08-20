"use strict";
const textBox = document.getElementById("textBox");
const toF = document.getElementById("toFahrenheit");
const toC = document.getElementById("toCelcius");
const result = document.getElementById("result");
let temp;
function convert() {
    temp = Number(textBox.value);
    if (toF.checked) {
        temp = temp * 9 / 5 + 32;
        result.textContent = temp + " ℉";
    }
    else if (toC.checked) {
        temp = (temp - 32) * (5 / 9);
        result.textContent = temp + " ℃";
    }
    else {
        result.textContent = 'Select a unit';
    }
}
//# sourceMappingURL=24-TemperatureConversionProgram.js.map