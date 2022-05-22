const load = (path, options = { useHttpRequest: false, useUnsafeInjectorLoader: false }) => {
    const content = options.useHttpRequest ? http.request(path) : fs.read(path);

    if (options.useUnsafeInjectorLoader)
        return getUnsafeInjectorLoaderResponse(content);

    const parsed = esprima.parse(content).body;

    const result = parsed
        .flatMap((item) => item.declarations)
        .map(getEsprimaDeclarationPatternValue);

    const declared = {};

    result.forEach(item => {
        let content;

        switch (item.value.constructor.name) {
            case "ConstructorAssembler":
                content = Object.assign({ "constructor": item.value.constructorName }, item.value.createInstance());
                break;

            default:
                content = item.value;
                break;
        }

        declared[item.name] = content;
    });

    return declared;
}