function require(module) {
    console.log(module)

    __currentdir__ = std.path.getFolderPath(module)

    const parts = module.split(":")

    if(!(parts[0].endsWith(".js"))) {
        parts[0] = parts[0] += ".js"
    }

    const path = parts[0].replace("./", application.currentDir())

    console.log(path)

    const loaded = load(__basedir__ + path)

    if(parts[1]) {
        return loaded[parts[1]]
    }

    return loaded
}