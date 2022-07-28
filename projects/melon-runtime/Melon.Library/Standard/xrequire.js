const xrequire = (target) => {
    const attributes = target.split(":");

    switch (attributes[0]) {
        case "dotnet":
            return __xrequire_dotnet_internal__(attributes[1]);

        case "dotnet-external":
            /* TODO: Check if the target loaded file actually exists */
            return __xrequire_dotnet_external__(attributes[1]);
    }
}

const __xrequire_dotnet_internal__ = (namespace) => {
    return {
        getType: (type) => {
            return {
                getMethod: (method, index = 0) => {
                    return {
                        invoke: (parameters = [], targetObject = null) => {
                            if (!Array.isArray(parameters)) {
                                parameters = [parameters];
                            }

                            return _$internalBinding["InteropInternalCallMethod"]
                                (namespace, type, method, index, [targetObject, ...parameters]);
                        }
                    }
                },
                getField: (field) => _$internalBinding["InteropInternalGetField"](namespace, type, field),
                createInstance: (parameters) => {
                    if (!Array.isArray(parameters)) {
                        parameters = [parameters];
                    }

                    return _$internalBinding["InteropInternalCreateInstanceOfType"](namespace, type, parameters);
                }
            }
        }
    }
}

const __xrequire_dotnet_external__ = (fileName) => {
    return {
        getType: (type) => {
            return {
                getMethod: (method, index = 0) => {
                    return {
                        invoke: (parameters = [], targetObject = null) => {
                            if (!Array.isArray(parameters)) {
                                parameters = [parameters];
                            }

                            return _$internalBinding["InteropExternalCallMethodDirectlyFromAssembly"]
                                (fileName, namespace, type, method, index, [targetObject, ...parameters]);
                        }
                    }
                },
                getField: (field) => _$internalBinding["InteropExternalCallFieldDirectlyFromAssembly"]
                    (fileName, namespace, type, field),
                createInstance: (parameters) => {
                    if (!Array.isArray(parameters)) {
                        parameters = [parameters];
                    }

                    return _$internalBinding["InteropExternalCreateInstanceDirectlyFromAssembly"]
                        (fileName, namespace, type, parameters);
                }
            }
        }
    }
}