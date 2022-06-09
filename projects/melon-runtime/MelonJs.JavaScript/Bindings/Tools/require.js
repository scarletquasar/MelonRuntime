function require(module) {
    module = module.replace("./", application.currentDir())
    __currentdir__ = std.path.getFolderPath(module)

    const parts = module.split(":")

    if(!(parts[0].endsWith(".js"))) {
        parts[0] = parts[0] += ".js"
    }

    const loaded = load(__basedir__ + parts[0])

    if(parts[1]) {
        return loaded[parts[1]]
    }

    return loaded
}