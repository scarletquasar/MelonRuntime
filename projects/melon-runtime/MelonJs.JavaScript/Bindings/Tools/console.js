Melon.console = {
    _detailedDebugCheck: (object) => {
        if (Melon.debug.enableDetailedInformation) {
            //Reference case for https://github.com/MelonRuntime/MelonJS/issues/16
            if (typeof object === "function") {
                Melon.debug.log("[Debug] Currently, there is no support to log/stringify functions/classes. " +
                    "See more information in: https://github.com/MelonRuntime/MelonJS/issues/16")
            }
        }
    },
    /*
     * console.log(...arguments)
     * Serializes the object passed as an argument and brings its representation in JSON notation, 
     * currently it does not have the ability to serialize Function and Class values and will 
     * return the raw name of the object (in C#) or System.ExpandObject
     * */
    log: function () {
        Array.from(arguments).forEach(object => {
            Melon.console._detailedDebugCheck(object);
            __console_log__(object, 15);
        })
    },
    /*
     * console.error(...arguments)
     * console.log with a red color to indicate an error
     * */
    error: function () {
        Array.from(arguments).forEach(object => {
            Melon.console._detailedDebugCheck(object);
            __console_log__(object, 12);
        })
    },
    /*
     * console.warn(...arguments)
     * console.log with a yellow color to indicate a warning
     * */
    warn: function () {
        Array.from(arguments).forEach(object => {
            Melon.console._detailedDebugCheck(object);
            __console_log__(object, 14);
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
     * console.table(tabularData)
     * Displays tabular data as a table
     * */
    table: function (data, columns) {
        if (Melon.data.constructor === Object) {
            if (!columns) {
                let columns = [];
                for (let prop in data[0]) {
                    if (columns.indexOf(prop) === -1) {
                        columns.push(prop);
                    }
                }

                let header = '(index)';
                for (let p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                Melon.console.log(header);

            }
            else if (typeof columns !== 'object') {
                let columns = [];
                for (let index in data) {
                    for (let prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            }
            else {
                let header = '(index)';
                for (let p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                Melon.console.log(header);
            }

            for (let obj in data) {
                let entry = data[obj];
                let entryStr = obj + '';
                for (let j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                Melon.console.log(entryStr);
            }

        }
        else if (Melon.data.constructor === Array) {
            if (!columns) {
                let columns = [];
                for (let prop in data[0]) {
                    if (columns.indexOf(prop) === -1) {
                        columns.push(prop);
                    }
                }

                let header = '(index)';
                for (let p in columns) {
                    header += ' | ';
                    header += columns[p];
                }

                Melon.console.log(header);
            }
            else if (typeof columns !== 'object') {
                let columns = [];
                for (let index in data) {
                    for (let prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            }
            else {
                let header = '(index)';
                for (let p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                Melon.console.log(header);
            }

            for (let i = 0; i < data.length; i++) {
                let entry = data[i];
                let entryStr = i + '';

                for (var j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                
                Melon.console.log(entryStr);
            }
        }
    }
}