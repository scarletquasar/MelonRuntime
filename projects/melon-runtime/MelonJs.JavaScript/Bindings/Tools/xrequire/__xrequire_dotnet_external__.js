const __xrequire_dotnet_external__ = (fileName) => {
    return {
        getType: (type) => {
            return {
                getMethod: (method) => {
                    return {
                        invoke: (parameters, targetObject = null) => {
                            if (!Array.isArray(parameters)) {
                                parameters = [parameters];
                            }

                            return __dotnet_external__
                                .CallMethodDirectlyFromAssembly(fileName, namespace, type, method, [targetObject, ...parameters]);
                        }
                    }
                },
                getField: (field) => __dotnet__
                    .CallFieldDirectlyFromAssembly(fileName, namespace, type, field),
                createInstance: (parameters) => {
                    if (!Array.isArray(parameters)) {
                        parameters = [parameters];
                    }

                    return __dotnet_external__
                        .CreateInstanceDirectlyFromAssembly(fileName, namespace, type, parameters);
                }
            }
        }
    }
}