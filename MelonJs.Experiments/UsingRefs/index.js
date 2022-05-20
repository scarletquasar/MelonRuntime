debug.enableStackTracing(true)

let value = 1;
const valueRef = r*(value);
valueRef.modificator = x => x + 10;

value = 2;

console.log("Testing:")
console.log("Literal value: " + value);
console.log("Value reference: " + valueRef.getValue());
console.log("");

value = 3;

console.log("Testing:")
console.log("Literal value: " + value);
console.log("Value reference: " + valueRef.getValue());
console.log("");

value = 4;

console.log("Testing:")
console.log("Literal value: " + value);
console.log("Value reference: " + valueRef.getValue());
console.log("");