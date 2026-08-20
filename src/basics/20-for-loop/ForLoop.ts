//  For loop = repeat some code a LIMITED amount of times

for (let i: number = 0; i <= 20; i++) {
    if (i == 13) {
        continue;
    } else if (i == 17) {
        break;
    }
    console.log(i);
}

export { };
