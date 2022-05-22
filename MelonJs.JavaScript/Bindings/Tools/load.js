const load = (path, options = { useHttpRequest: true, useUnsafeInjectorLoader: false }) => {
    const content = options.useHttpRequest ? fs.read(path) : http.request(path);

    if (options.useUnsafeInjectorLoader) {
        try {
            melon_internal_script_injector(content);

            return {
                success: true
            }
        }
        catch (e) {
            return {
                success: false,
                error: e.toString()
            }
        }
    }

    const parsed = esprima.parse(content).body;
    const result = [];
    const declared = {};

    const getDeclarationPatternValue = (input) => {
        let value;
        const name = input.id.name;

        switch (input.init.type) {
            case "Literal":
                value = input.init.value;
                break;

            case "ArrayExpression":
                value = [];

                input.init.elements.forEach(element => {
                    value.push(getDeclarationPatternValue(element.value));
                });
                break;

            case "ObjectExpression":
                value = {};

                input.init.properties.forEach(property => {
                    value[property.key.name] = getDeclarationPatternValue(property.value.value);
                });
                break;

            case "NewExpression":
                value = new ConstructorAssembler(input.init.callee.name, input.init.arguments);
                break;

            //TODO: ADD SUPPORT TO ArrowFunctionExpression AND FunctionExpression
        }

        return {
            name,
            value
        };
    }

    parsed.forEach(item => { 
        item.declarations.forEach(declaration => {
            result.push(getDeclarationPatternValue(declaration));
        });
    });

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