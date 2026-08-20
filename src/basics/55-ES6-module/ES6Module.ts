// ES6 Module = An external file that contains reuseable code
//              that can be imported into other TS files.
//              Write resuable code for many different apps.
//              Can contain variables, classes, functions ... and more
//              Introduced as part of ECMAScript 2015 update

import { PI, getCircumference, getArea, getVolume } from './math-util.ts';

console.log(PI);

const circumference = getCircumference(10);
const area = getArea(10);
const volume = getVolume(10);

console.log(`${circumference.toFixed(2)}cm`);
console.log(`${area.toFixed(2)}cm²`);
console.log(`${volume.toFixed(2)}cm³`);

export { };
