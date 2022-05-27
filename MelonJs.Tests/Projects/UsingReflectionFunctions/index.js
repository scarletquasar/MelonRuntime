debug.enableStackTracing(true)

let value = 1
const valueRef = r*(value)
valueRef.modificator = x => x + 10

value = 2;

console.log("Testing:")
console.log("Literal value: " + value)
console.log("Value reference: " + valueRef.getValue())
console.log("")

value = 3;

console.log("Testing:")
console.log("Literal value: " + value)
console.log("Value reference: " + valueRef.getValue());
console.log("");

value = 4;

console.log("Testing:")
console.log("Literal value: " + value)
console.log("Value reference: " + valueRef.getValue());
console.log("");

let obj = {a: 1}
let objClone = c*(obj)

console.log("Object clone:")
console.log("Literal object: ")
console.log(obj)
console.log("Object clone: ")
console.log(objClone)