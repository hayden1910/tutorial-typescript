const watchDisplay = document.getElementById("display") as HTMLParagraphElement;
let timer: number | null = null;
let startTime: number = 0;
let elapsedTime: number = 0;
let isRunning: boolean = false;

function start(): void {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        console.log(timer);
        isRunning = true;
    }
}

function stop(): void {
    if (isRunning) {
        clearInterval(timer!);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset(): void {
    clearInterval(timer!);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    watchDisplay.textContent = "00:00:00:00";
}

function update(): void {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours: number | string = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes: number | string = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds: number | string = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds: number | string = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    watchDisplay.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
