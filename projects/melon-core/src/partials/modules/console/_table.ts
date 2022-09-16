import { _console } from "./_console";

function _table(data: any[], columns: any[]) {
    if (data.constructor === Object) {
        if (!columns) {
            columns = [];
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
            _console.log(header);

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
            _console.log(header);
        }

        for (let obj in data) {
            let entry = data[obj];
            let entryStr = obj + '';
            for (let j = 0; j < columns.length; j++) {
                entryStr += ' | ';
                entryStr += entry[columns[j]];
            }

            _console.log(entryStr);
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

            _console.log(header);
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

            _console.log(header);
        }

        for (let i = 0; i < data.length; i++) {
            let entry = data[i];
            let entryStr = i + '';
            for (let j = 0; j < columns.length; j++) {
                entryStr += ' | ';
                entryStr += entry[columns[j]];
            }

            _console.log(entryStr);
        }
    }
}

export { _table }