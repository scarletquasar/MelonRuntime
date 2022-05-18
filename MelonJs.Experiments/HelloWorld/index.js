var a = 1;

const b = ref('a');
b.set(3);

console.log(b.value())
console.log(a);


environment.setVariable("hw","Hello World!")
console.log(environment.getVariable("hw"))

application.end()
