const console = {
    log: function () {
        Array.from(arguments).forEach(object => {
            _$internalBinding["ConsoleLog"](object, 15);
        })
    },
    error: function () {
        Array.from(arguments).forEach(object => {
            _$internalBinding["ConsoleLog"](object, 12);
        })
    },
    warn: function () {
        Array.from(arguments).forEach(object => {
            _$internalBinding["ConsoleLog"](object, 14);
        })
    },
    clear: () => __console_clear__(),
    read: () => __console_readLine__(),
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

            }
            else if (typeof columns !== 'object') {
                var columns = [];
                for (var index in data) {
                    for (var prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            }
            else {
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

        }
        else if (data.constructor === Array) {
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

            }
            else if (typeof columns !== 'object') {
                var columns = [];
                for (var index in data) {
                    for (var prop in data[index]) {
                        if (columns.indexOf(prop) === -1) {
                            columns.push(prop);
                        }
                    }
                }
            }
            else {
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