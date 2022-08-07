const dotnet = {
    getStaticMethod: (expression) => {
        const parts = expression.split(":");
        const namespace = parts[0];
        const type = parts[1];
        const method = parts[2];

        const finalMethod = function (...args) {
            const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];

            return callStaticMethodBinding(namespace, type, method, [...args]);
        }

        return finalMethod;
    },
    getStaticProperty: (expression) => {
        const parts = expression.split(":");
        const namespace = parts[0];
        const type = parts[1];
        const property = parts[2];

        const callStaticPropertyBinding = _$internalBinding["GetStaticProperty"];
        const internalStaticProperty = callStaticPropertyBinding(namespace, type, property);

        return internalStaticProperty;
    },
    loadAssembly: (path) => _$internalBinding["LoadAssembly"](path),
    removeAssembly: (fullName) => _$internalBinding["RemoveAssembly"](fullName),
    getLoadedAssemblies: () => _$internalBinding["GetLoadedAssemblies"],
    types: {
        sbyte: (number) => {
            if (number > 127 || number < -128) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "sbyte",
                value
            }
        },
        byte: (number) => {
            if (number > 255 || number < 0) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "byte",
                value
            }
        },
        short: (number) => {
            if (number > 32767 || number < -32768) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "short",
                value
            }
        },
        ushort: (number) => {
            if (number > 65535 || number < 0) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "ushort",
                value
            }
        },
        int: (number) => {
            if (number > 2147483647 || number < -2147483648) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "int",
                value
            }
        },
        uint: (number) => {
            if (number > 4294967295 || number < 0) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "uint",
                value
            }
        },
        long: (number) => {
            if (number > 9223372036854775807 || number < -9223372036854775808) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "long",
                value
            }
        },
        ulong: (number) => {
            if (number > 18446744073709551615 || number < 0) {
                throw new RangeError(internalConsts.INVALID_NUMBER_CAPACITY);
            }

            const value = Math.floor(number);

            return {
                type: "ulong",
                value
            }
        },
        float: (number) => {
            return {
                type: "float",
                number
            }
        },
        double: (number) => {
            return {
                type: "double",
                number
            }
        },
        decimal: (number) => {
            return {
                type: "decimal",
                number
            }
        }
    },
    Realm: class {
        constructor(name) {
            _$internalBinding["CreateRealm"](name);
            this.name = name;
            this.setValue = (name, value) => {
                _$internalBinding["SetRealmScriptProperty"](this.name, name, value);
            }
            this.setInstance = (name, expression, ...parameters) => {
                const parts = expression.split(":");
                const namespace = parts[0];
                const type = parts[1];

                _$internalBinding["SetRealmInstanceProperty"](this.name, name, namespace, type, Array.from(parameters));
            }
            this.get = (name) => _$internalBinding["GetRealmProperty"](this.name, name);
        }
    }
}