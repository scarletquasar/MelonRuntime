const console = {
    _detailedDebugCheck: (object) => {
        if (debug.enableDetailedInformation) {
            //Reference case for https://github.com/MelonRuntime/MelonJS/issues/16
            if (typeof object === "function") {
                debug.log
                    ("[Debug]: Currently, there is no support to log/stringify functions/classes. " +
                     "See more information in: https://github.com/MelonRuntime/MelonJS/issues/16")
            }
        }
    },
    /*
     * console.log(object)
     * Serializes the object passed as an argument and brings its representation in JSON notation, 
     * currently it does not have the ability to serialize Function and Class values and will 
     * return the raw name of the object (in C#) or System.ExpandObject
     * */
    log: function () {
        Array.from(arguments).forEach(object => {
            console._detailedDebugCheck(object)
            __console_log__(object, 15)
        })
    },
    /*
     * console.error(object)
     * console.log with a red color to indicate an error
     * */
    error: function () {
        Array.from(arguments).forEach(object => {
            console._detailedDebugCheck(object)
            __console_log__(object, 12)
        })
    },
    /*
     * console.warn(object)
     * console.log with a yellow color to indicate a warning
     * */
    error: function () {
        Array.from(arguments).forEach(object => {
            console._detailedDebugCheck(object)
            __console_log__(object, 14)
        })
    },
    /*
     * console.clear()
     * Clear the current console screen by calling the built-in clear functionality provided 
     * for the .NET console
     * */
    clear: () => __console_clear__(),
    /*
     * console.read()
     * Reads the next line typed by the end user and returns it as a function in the next callback
     * */
    read: () => __console_readLine__(),
    /*
     * console.table()
     * Displays tabular data as a table
     * */
    table: function (object) {
        let res = []

        if (Array.isArray(object)) {
            object.forEach(item => {
                res.push(`|${item}|`)
            })
            return
        }
        else {
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
        }

        res.forEach(console.log)
    }
}
