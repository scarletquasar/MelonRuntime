const shift = (value) => {
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