// Date objects = Objects that contain values that represent dates and times
//                These date objects can be changed and formatted

// Date(year, month, day, hour, minute, second, ms)
const date: Date = new Date();

// Get
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const dayOfWeek = date.getDay();

console.log(year);
console.log(month);
console.log(day);
console.log(hour);
console.log(minute);
console.log(second);
console.log(dayOfWeek);

// Set
date.setFullYear(2024);
date.setMonth(6);
date.setDate(1);
date.setHours(2);
date.setMinutes(3);
date.setSeconds(4);

console.log(date);

// Compare
const date1 = new Date("2024-12-31");
const date2 = new Date("2025-01-01");
if (date2 > date1) {
    console.log("Happy New Year!");
}

export { };
