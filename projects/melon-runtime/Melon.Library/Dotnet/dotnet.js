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