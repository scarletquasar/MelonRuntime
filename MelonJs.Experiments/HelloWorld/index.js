const test = load(__basedir + "/test.js")
console.log(test)

environment.setVariable("hw","Hello World!")
console.log(environment.getVariable("hw"))
