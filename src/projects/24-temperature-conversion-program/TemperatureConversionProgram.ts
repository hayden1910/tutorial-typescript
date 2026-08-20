const textBox = document.getElementById("textBox") as HTMLInputElement;
const toF = document.getElementById("toFahrenheit") as HTMLInputElement;
const toC = document.getElementById("toCelcius") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;
let temp: number;

function convert(): void {
    temp = Number(textBox.value);

    if (toF.checked) {
        temp = temp * 9 / 5 + 32;
        result.textContent = temp + " ℉";
    } else if (toC.checked) {
        temp = (temp - 32) * (5 / 9);
        result.textContent = temp + " ℃";
    } else {
        result.textContent = 'Select a unit';
    }
}