const calcDisplay = document.getElementById("display") as HTMLInputElement;

function appendToDisplay(input: string): void {
    calcDisplay.value += input;
}

function allClearDisplay(): void {
    calcDisplay.value = "";
}

function clearDisplay(): void {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
}

function calculate(): void {
    try {
        const sanitizedInput = calcDisplay.value.replace(/x/g, '*');
        calcDisplay.value = eval(sanitizedInput);
    } catch (error) {
        calcDisplay.value = "Error";
    }
}
