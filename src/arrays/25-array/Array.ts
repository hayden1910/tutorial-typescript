// Array = a variable like structure that can hold more than 1 value

let fruits: string[] = ['apple', 'orange', 'banana'];

// fruits.push('coconut');  // add at the end
//fruits.pop();             // delete at the end
// fruits.unshift('mango'); // add at the begin
// fruits.shift();          // delete at the begin

// let numOfFruits = fruits.length;
// console.log(numOfFruits);

// let searching = window.prompt('What are you searching for');
// let index = fruits.indexOf(searching);
// if(index == -1){
//     alert(`[${searching}] don't have in array`);
// }else{
//     alert(`[${searching}] are number ${index} in array`)
// }

let fruit: string[] | string = fruits.sort().reverse();
for (fruit of fruits) {
    console.log(fruit);
}

export { };
