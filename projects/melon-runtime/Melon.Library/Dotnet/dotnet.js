const dotnet = {
    getMethodFrom: (expression, index = 0) => {
        const parts = expression.split(":");
        const namespace = parts[0];
        const type = parts[1];
        const method = parts[2];

        const finalMethod = function (...args) {
            const xrequireNamespace = xrequire(`dotnet:${namespace}`);
            const xrequireType = xrequireNamespace.getType(type);
            const xrequireMethod = xrequireType.getMethod(method, index);

            return xrequireMethod.invoke(Array.from(args));
        }

        return finalMethod;
    }
}