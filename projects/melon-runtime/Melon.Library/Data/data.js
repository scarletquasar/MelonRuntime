const data = {
    clone: function (target) {
        if (typeof target === "function") {
            return function () { target(...arguments ?? ''); }
        }

        return JSON.parse(JSON.stringify(target));
    },
    compare: (target, value, expression = (a, b) => a === b, customModifier = (a, b) => [a, b]) => {
        const result = {
            comment: "",
            equals: false,
            equalityPercent: 0
        }
        const compareUniques = (target, value) => expression(target, value);
        const compareArrays = (target, value) => {
            const equalityArray = [];
            target.forEach((item, index) => equalityArray.push(compareUniques(item, value[index])));

            return equalityArray.every(item => item === true);
        }
        const compareObjects = (target, value) => compareArrays(Object.entries(target), Object.entries(value));
        const compareMaps = (target, value) => compareArrays(target.entries(), value.entries());
        const compareEnumerables = (target, value) => compareArrays(target.toArray(), value.toArray());

        switch (typeof target) {
            case "string":
            case "number":
            case "boolean":
                const length = target.toString().length;

                break;
        }

        return result;

    },
    find: (object, target, count = 0, found = false) => {
        if (typeof target == "object") {
            if (data.compare(object, target)) {
                found = true;
                count++;
            }
            switch (target.constructor.name) {
                case "Array":
                    const len = target.length;

                    for (let i = 0; i < len; i++) {
                        const res = data.find(object, target[i]);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Object":
                    const entries = Object.entries(target);
                    const lenObj = entries.length;

                    for (let i = 0; i < lenObj; i++) {
                        const res = data.find(object, entries[i][1]);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Map":
                    for (let [key, value] of target) {
                        const res = data.find(object, value)
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                case "Set":
                    for (let element of target) {
                        const res = data.find(object, element);
                        count += res.count;
                        if (!found) found = res.found;
                    }

                    break;

                default:
                    if (data.compare(object, target)) {
                        count++;
                        found = true;
                    }
            }
        }
        else {
            if (data.compare(object, target)) {
                count++;
                found = true;
            }
        }
        return {
            count,
            found
        }
    },
    PgClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`
        this.executeNonQuery = (sql) => _$internalBinding["PostgreSQLBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["PostgreSQLBindingQuery"](sql, this._connectionString));

        return this;
    },
    MySQLClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`;
        this.executeNonQuery = (sql) => _$internalBinding["MySqlBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["MySqlBindingQuery"](sql, this._connectionString));

        return this;
    },
    SqlServerClient: function (host, port, database, username, password) {
        this._connectionString = `Server=${host};Port=${port};Database=${database};User Id=${username};Password=${password};`;
        this.executeNonQuery = (sql) => _$internalBinding["SqlServerBindingNonQuery"](sql, this._connectionString);
        this.executeQuery = (sql) => JSON.parse(_$internalBinding["SqlServerBindingQuery"](sql, this._connectionString));

        return this;
    }
}