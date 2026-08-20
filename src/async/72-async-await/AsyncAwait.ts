// Async =  makes a function return a promise
// Await =  makes an async function wait for a promise
//          Allow you write asynchronours code in a synchronous manner
//          Async doesn't have resolve or reject parameters
//          Everything after Await is placed in an event queue

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
                resolve("You clean the kitchen 🫧🧽");
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

async function doChores(): Promise<void> {
    try {
        const walkDogResult = await walkDog();
        console.log(walkDogResult);

        const cleanKitchenResult = await cleanKitchen();
        console.log(cleanKitchenResult);

        const takeOutTrashResult = await takeOutTrash();
        console.log(takeOutTrashResult);

        console.log("You finished all the chores!")
    } catch (error) {
        console.error(error);
    }
}

doChores();

export { };
