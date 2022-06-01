const vars = require("vars")

console.log(vars.numberThree)
console.log(vars.emptyArray)
console.log(vars.emptyObject)
console.log(vars.emptyString)
console.log(vars.log)

eval(vars.log)

vars.say("Hello!")

const say = require("vars:say")

say("Hi!")