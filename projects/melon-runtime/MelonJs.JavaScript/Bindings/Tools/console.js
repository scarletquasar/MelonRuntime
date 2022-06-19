const console = {
    _detailedDebugCheck: (object) => {
        if (debug.enableDetailedInformation) {
            //Reference case for https://github.com/MelonRuntime/MelonJS/issues/16
            if (typeof object === "function") {
                debug.log
                    ("[Debug] Currently, there is no support to log/stringify functions/classes. " +
                     "See more information in: https://github.com/MelonRuntime/MelonJS/issues/16")
            }
        }
    },
    /*
     * console.details(...arguments)
     * Displays information about the target objects, focused in debug
     * */
    details: function () {
        Array.from(arguments).forEach(object => {
            console._detailedDebugCheck(object)
            __console_details__(object, 15)
        })
    },
    /*
     * console.log(...arguments)
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
     * console.error(...arguments)
     * console.log with a red color to indicate an error
     * */
    error: function () {
        Array.from(arguments).forEach(object => {
            console._detailedDebugCheck(object)
            __console_log__(object, 12)
        })
    },
    /*
     * console.warn(...arguments)
     * console.log with a yellow color to indicate a warning
     * */
    warn: function () {
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
     * console.table(tabularData)
     * Displays tabular data as a table
     * */
    table: function (data, columns) {
        if (data.constructor === Object) {
            if (!columns) {
                var columns = [];
                for (var prop in data[0]) {
                    if (columns.indexOf(prop) === -1) {
                        columns.push(prop);
                    }
                }

                var header = '(index)';
                for (var p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                console.log(header);

            } else if (typeof columns !== 'object') {
                var columns = [];
                for (var index in data) {
                    for (var prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            } else {
                var header = '(index)';
                for (var p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                console.log(header);
            }

            for (var obj in data) {
                var entry = data[obj];
                var entryStr = obj + '';
                for (var j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                console.log(entryStr);
            }

        } else if (data.constructor === Array) {
            if (!columns) {
                var columns = [];
                for (var prop in data[0]) {
                    if (columns.indexOf(prop) === -1) {
                        columns.push(prop);
                    }
                }

                var header = '(index)';
                for (var p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                console.log(header);

            } else if (typeof columns !== 'object') {
                var columns = [];
                for (var index in data) {
                    for (var prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            } else {
                var header = '(index)';
                for (var p in columns) {
                    header += ' | ';
                    header += columns[p];
                }
                console.log(header);
            }

            for (var i = 0; i < data.length; i++) {
                var entry = data[i];
                var entryStr = i + '';
                for (var j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                console.log(entryStr);
            }
        }
    }
}
