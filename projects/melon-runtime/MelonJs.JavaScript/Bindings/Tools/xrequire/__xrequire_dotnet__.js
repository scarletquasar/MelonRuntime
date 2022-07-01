const __xrequire_dotnet__ = (namespace) => {
    return {
        getType: (type) => {
            return {
                getMethod: (method) => {
                    return {
                        invoke: (parameters, targetObject = null) => {
                            if (!Array.isArray(parameters)) {
                                parameters = [parameters];
                            }

                            return __dotnet__.CallMethod(namespace, type, method, [targetObject, ...parameters]);
                        }
                    }
                },
                getField: (field) => __dotnet__.GetField(namespace, type, field)
            }
        }
    }
}