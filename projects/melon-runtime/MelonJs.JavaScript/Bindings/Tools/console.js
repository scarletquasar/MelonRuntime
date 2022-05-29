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
        melon_internal_console_log(object, 15)
    },

    error: (object) => {
        console._detailedDebugCheck(object)
        melon_internal_console_log('[X] ' + object, 12)
    },

    warn: (object) => {
        console._detailedDebugCheck(object)
        melon_internal_console_log('[!] ' + object, 14)
    },

    clear: () => {
        melon_internal_console_clear()
    },

    read: () => {
        return melon_internal_console_readLine()
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
