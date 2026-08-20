const choices: string[] = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay") as HTMLSpanElement;
const computerDisplay = document.getElementById("computerDisplay") as HTMLSpanElement;
const resultDisplay = document.getElementById("resultDisplay") as HTMLParagraphElement;
const playerScoreDisplay = document.getElementById("playerScoreDisplay") as HTMLSpanElement;
const computerScoreDisplay = document.getElementById("computerScoreDisplay") as HTMLSpanElement;
let playerScore: number = 0;
let computerScore: number = 0;

function playGame(playerChoice: string): void {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result: string = "";
    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "paper":
                result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "scissors":
                result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
                break;
        }
    }
    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    switch (result) {
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore.toString();
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore.toString();
            break;
    }
}