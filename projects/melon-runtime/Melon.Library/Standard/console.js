const console = {
    _dotnetCLNConsole: (method) => dotnet.getStaticMethod(`Cli.NET.Tools:CLNConsole:${method}`),
    _dotnetConsole: (method) => dotnet.getStaticMethod(`System:Console:${method}`),
    write: (target, color = "White") => {
        const result = std.json.tryStringify(target);
        console._dotnetCLNConsole("Write")(result, color);
    },
    writeLine: (target, color = "White") => {
        const result = std.json.tryStringify(target);
        console._dotnetCLNConsole("WriteLine")(result, color);
    },
    log: function () {
        Array.from(arguments).forEach(object => {
            const result = std.json.tryStringify(object);
            console._dotnetCLNConsole("WriteLine")(result, "White");
        })
    },
    error: function () {
        Array.from(arguments).forEach(object => {
            const result = std.json.tryStringify(object);
            console._dotnetCLNConsole("WriteLine")(result, "DarkRed");
        })
    },
    warn: function () {
        Array.from(arguments).forEach(object => {
            const result = std.json.tryStringify(object);
            console._dotnetCLNConsole("WriteLine")(result, "Yellow");
        })
    },
    clear: () => console._dotnetConsole("Clear")(),
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
                console.log(header);
            }

            for (let obj in data) {
                let entry = data[obj];
                let entryStr = obj + '';
                for (let j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                console.log(entryStr);
            }

        }
        else if (data.constructor === Array) {
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
                console.log(header);

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
                console.log(header);
            }

            for (let i = 0; i < data.length; i++) {
                let entry = data[i];
                let entryStr = i + '';
                for (let j = 0; j < columns.length; j++) {
                    entryStr += ' | ';
                    entryStr += entry[columns[j]];
                }
                console.log(entryStr);
            }
        }
    }
}