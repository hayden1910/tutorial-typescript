// Promise =  An object that manages asysnchronous operations
//            wrap a promise object around {asynchronours code}
//            "I promise to return a value"
//            PENDING -> RESOLVED or REJECTED
//            new Promise((resolve, reject) => {asynchronous code})


// DO THESE CHORES IN ORDER
// 1. Walk the dog
// 2. Clean the kitchen
// 3. Take out the trash

// function walkDog(callback) {
//     setTimeout(() => {
//         console.log("You walk the dog 🐕");
//         callback();
//     }, 1500);
// }

// function cleanKitchen(callback) {
//     setTimeout(() => {
//         console.log("You clean the kitchen 🫧🧽");
//         callback();
//     }, 2500);
// }

// function takeOutTrash(callback) {
//     setTimeout(() => {
//         console.log("You take out the trash 🗑️");
//         callback();
//     }, 500);
// }

// walkDog(() => {
//     cleanKitchen(() => {
//         takeOutTrash(() => {
//             console.log("You finished all the chores!");
//         })
//     })
// })


// function walkDog() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("You walk the dog 🐕");
//         }, 1500);
//     })
// }

// function cleanKitchen() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("You clean the kitchen 🫧🧽");
//         }, 2500);
//     })
// }

// function takeOutTrash() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("You take out the trash 🗑️");
//         }, 500);
//     })
// }

// walkDog().then(value => { console.log(value); return cleanKitchen() })
//     .then(value => { console.log(value); return takeOutTrash() })
//     .then(value => { console.log(value); console.log("You finished all the chores!") });


function walkDog(): Promise<string> {
    return new Promise<string>((resolve: (value: string) => void, reject: (reason?: any) => void) => {
        setTimeout(() => {
            const dogWalked = true;
            if (dogWalked) {
                resolve("You walk the dog 🐕");
            } else {
                reject("You DIDN'T walk the dog")
            }
        }, 1500);
    })
}

function cleanKitchen(): Promise<string> {
    return new Promise<string>((resolve: (value: string) => void, reject: (reason?: any) => void) => {
        setTimeout(() => {
            const kitchenCleaned = true;
            if (kitchenCleaned) {
                resolve("You clean the kitchen 🧽");
            } else {
                reject("You DIDN'T clean the kitchen");
            }
        }, 2500);
    })
}

function takeOutTrash(): Promise<string> {
    return new Promise<string>((resolve: (value: string) => void, reject: (reason?: any) => void) => {
        setTimeout(() => {
            const trashTakenOut = false;
            if (trashTakenOut) {
                resolve("You take out the trash 🗑️");
            } else {
                reject("You DIDN'T take out of the trash ")
            }
        }, 500);
    })
}

walkDog().then(value => { console.log(value); return cleanKitchen() })
    .then(value => { console.log(value); return takeOutTrash() })
    .then(value => { console.log(value); console.log("You finished all the chores!") })
    .catch(error => console.error(error));

export { };
