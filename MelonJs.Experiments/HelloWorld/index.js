debug.enableStackTracing(true);

var a = new FileObject({
    name: "Test",
    content: "Test",
    encoding: "utf8"
});

console.log(a);

environment.setVariable("hw","Hello World!")
console.log(environment.getVariable("hw"))

application.end()
