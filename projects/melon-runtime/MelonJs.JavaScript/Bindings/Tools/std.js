const std = {}

std["shift"] = (value) => {
    const internal = {
        option: (target, callback) => {
            switch (typeof target) {
                case "object":
                    target.includes(value) && callback(target[target.indexOf(value)])
                    break;

                default:
                    value === target && callback(target)
                    break;
            }
            return shift(value);
        }
    }
    return internal;
}
std["reflect"] = (target) => {
    this.name = target;
    this.modificator = x => x;

    this.getValue = () => this.modificator(eval(`${this.name}`))

    return this;
}
std["system"] = {
    getBaseFolder: () => __basedir
}
std["path"] = {
    getFolderPath: (fullPath) => __getfolderpath__(fullPath)
}
std["workers"] = {
    add: (name, script) => {
        __workers_add__(name, script)

        std.workers[name] = {
            result: null,
            start: () => __workers_start__(name)
        }
    }
}