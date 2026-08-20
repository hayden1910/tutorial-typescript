// Select HTML elements with explicit type annotations
const numOfDice = document.getElementById("num-of-dice") as HTMLInputElement;
const rollBtn = document.getElementById("roll-btn") as HTMLButtonElement;
const diceResult = document.getElementById("result") as HTMLDivElement;
const diceImages = document.getElementById("dice-images") as HTMLDivElement;

function rollDice(): void {
    const values: number[] = [];
    const images: string[] = [];

    // Get numeric count from input
    const count: number = numOfDice.valueAsNumber || 0;

    for (let i = 0; i < count; i++) {
        const value: number = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="dice-images/${value}.png" alt="Dice ${value}">`);
    }

    // Update DOM content
    diceResult.textContent = `Dice: ${values.join(", ")}`;
    diceImages.innerHTML = images.join("");
}

// Attach event listener safely
rollBtn?.addEventListener("click", rollDice);

export { };