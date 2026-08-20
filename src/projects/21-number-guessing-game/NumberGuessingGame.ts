const minNum: number = 1;
const maxNum: number = 100;
const answer: number = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
let attempts: number = 0;
let guess: number | string | null;
let running: boolean = true;

while (running) {
    guess = window.prompt(`guess a number between ${minNum} - ${maxNum}`);
    guess = Number(guess);
    
    if (isNaN(guess)) {
        window.alert('Please enter a valid number');
    } else if (guess < minNum || guess > maxNum) {
        window.alert('Please enter a valid number');
    } else {
        attempts++;
        if (guess < answer) {
            window.alert('Too low, try again');
        } else if (guess > answer) {
            window.alert('Too high, try again');
        } else {
            window.prompt(`Correct, the answer was ${answer}. It took you ${attempts} attempts`);
            running = false;
        }
    }
    // running = false;
}

export { };
