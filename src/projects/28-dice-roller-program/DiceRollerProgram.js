// Select HTML elements with explicit type annotations
const numOfDice = document.getElementById("num-of-dice");
const rollBtn = document.getElementById("roll-btn");
const diceResult = document.getElementById("result");
const diceImages = document.getElementById("dice-images");
function rollDice() {
    const values = [];
    const images = [];
    // Get numeric count from input
    const count = numOfDice.valueAsNumber || 0;
    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="dice-images/${value}.png" alt="Dice ${value}">`);
    }
    // Update DOM content
    diceResult.textContent = `Dice: ${values.join(", ")}`;
    diceImages.innerHTML = images.join("");
}
// Attach event listener safely
rollBtn?.addEventListener("click", rollDice);
export {};
