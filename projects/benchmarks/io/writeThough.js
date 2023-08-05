const value = Array.from(Array(1000000).keys()).toString();
Melon.fs.writeText("./test.obj", value);
Melon.fs.deleteFile("./test.obj");