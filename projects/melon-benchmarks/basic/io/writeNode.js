fs = require('fs');
const value = Array.from(Array(1000000).keys()).toString();
fs.writeFileSync("./test.obj", value);
fs.unlinkSync("./test.obj");