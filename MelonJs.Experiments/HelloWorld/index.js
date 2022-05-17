var a = new FileObject({
    name: "Test",
    content: "Test"
});

console.log(a);

environment.setVariable("hw","Hello World!")
console.log(environment.getVariable("hw"))

application.end()
