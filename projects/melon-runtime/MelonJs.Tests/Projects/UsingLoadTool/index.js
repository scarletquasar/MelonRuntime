const vars = load(__basedir + "/vars.js")

debug.enableStackTracing(true)

console.log(vars)

console.log(vars.numberOne)
console.log(vars.emptyArray)
console.log(vars.emptyObject)
console.log(vars.emptyString)
console.log(vars.test)