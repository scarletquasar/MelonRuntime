const data = {
    clone: function (target) {
        if (typeof target === "function") {
            return function () { target(...arguments ?? ''); }
        }

        return JSON.parse(JSON.stringify(target));
    },
    compare: (target, value, expression = (a, b) => a === b, customModifier = null) => {
        const result = {
            comments: "",
            equals: false
        }
        const compareUniques = (target, value) => expression(target, value);
        const compareArrays = (target, value) => {
            const equalityArray = [];
            target.forEach((item, index) => {
                const value1 = item;
                const value2 = value[index];
                const { equals } = data.compare(value1, value2, expression, customModifier);

                equalityArray.push(equals);
            });

            return equalityArray.every(item => item === true);
        }
        const compareObjects = (target, value) => compareArrays(Object.entries(target), Object.entries(value));
        const compareMaps = (target, value) => compareArrays(target.entries(), value.entries());
        const compareSets = (target, value) => compareArrays(Array.from(target), Array.from(value));
        const compareEnumerables = (target, value) => compareArrays(target.toArray(), value.toArray());

        switch (typeof target) {
            case "string":
            case "number":
            case "boolean":
                const targetLength = target.toString().length;
                const valueLength = value.toString().length;

                if (targetLength != valueLength) {
                    result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                    return result;
                }

                if (!compareUniques(target, value))
                {
                    result.comment = internalConsts.COMPARATION_BASE_IS_DIFFERENT;
                    return result;
                }

                result.equals = true;
                return result;
            case "object":
                if (Array.isArray(target)) {
                    if (target.length != value.length) {
                        result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                        return result;
                    }

                    result.equals = compareArrays(target, value);
                    return result;
                }

                if (target.constructor === Set) {
                    if (target.size != value.size) {
                        result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                        return result;
                    }

                    result.equals = compareSets(target, value);
                    return result;
                }

                if (target.constructor === Map) {
                    if (target.size != value.size) {
                        result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                        return result;
                    }

                    result.equals = compareMaps(target, value);
                    return result;
                }

                if (target.constructor === Enumerable) {
                    if (target.count != value.count) {
                        result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                        return result;
                    }

                    result.equals = compareEnumerables(target, value);
                    return result;
                }

                if (target.constructor === Object) {
                    if (Object.keys(target).length != Object.keys(value).length) {
                        result.comment = internalConsts.COMPARATION_LENGTH_IS_DIFFERENT;
                        return result;
                    }

                    result.equals = compareObjects(target, value);
                    return result;
                }
        }

        if (customModifier) {
            const modified = customModifier(target, value);
            return data.compare(modified[0], modified[1]);
        }

        throw new TypeError(internalConsts.NO_SUPPORT_FOR_THE_OBJECT);
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