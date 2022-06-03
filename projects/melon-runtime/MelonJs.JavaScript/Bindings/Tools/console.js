const console = {
    _detailedDebugCheck: (object) => {
        if (debug.enableDetailedInformation) {
            //Reference case for https://github.com/MelonRuntime/MelonJS/issues/16
            if (typeof object === 'function') {
                debug.log(`
                    [MelonJS Debugger]: Currently, there is no support to log/stringify functions/classes
                    See more information in: https://github.com/MelonRuntime/MelonJS/issues/16
                `)
            }
        }
    },

    log: (object) => {
        console._detailedDebugCheck(object)
        __console_log__(object, 15)
    },

    error: (object) => {
        console._detailedDebugCheck(object)
        __console_log__('[X] ' + object, 12)
    },

    warn: (object) => {
        console._detailedDebugCheck(object)
        __console_log__('[!] ' + object, 14)
    },

    clear: () => {
        __console_clear__()
    },

    read: () => {
        return __console_readLine__()
    },

    table: (object) => {
        let res = [];

        if (Array.isArray(object)) {
            object.forEach(item => {
                res.push(`|${item}|`)
            })
        }

        switch (typeof object) {
            case "object":
                Object.entries(object).forEach(entry => {
                    res.push(`|${entry[0]}|${entry[1]}|`)
                })
                break

            default:
                res.push(`|${object}|`)
                break
        }

        res.forEach(console.log)
    }
};
