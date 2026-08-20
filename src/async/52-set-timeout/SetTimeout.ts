// setTimeout(callback, delay) = Schedules execution of a function after a delay (ms)
// clearTimeout(timeoutId)     = Cancels a timeout before it triggers

// 1. Basic delayed messages using named, anonymous, and arrow functions
function sayHello(): void {
  console.log("Hello");
}

setTimeout(sayHello, 2000);
setTimeout(function () {
  console.log("Hayden");
}, 4000);
setTimeout(() => {
  console.log("What u doin");
}, 6000);

// 2. Controlling timeouts with start / clear
let timeoutId: NodeJS.Timeout | number;

function startTimer(): void {
  timeoutId = setTimeout(() => console.log("Timer finished: Hello"), 3000);
  console.log("Timer started...");
}

function clearTimer(): void {
  clearTimeout(timeoutId);
  console.log("Timer cleared (canceled)!");
}

setTimeout(() => {
  startTimer();
}, 7000);

setTimeout(() => {
  clearTimer();
}, 8000)