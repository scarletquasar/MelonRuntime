debug.enableStackTracing(true)

const folder = new Folder({
    name: "MyFolder",
    content: [ new File({
        name: "test",
        content: "test",
        encoding: "utf8"
    }) ]
});

console.log(folder)

const value = 1;
const valueRef = r*(value);

console.log("Literal value: " + value);
console.log("Value reference: " + valueRef.value());