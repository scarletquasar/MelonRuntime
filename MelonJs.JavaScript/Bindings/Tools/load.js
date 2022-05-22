const load = (path, useHttpRequest = true, useLocalInjectorLoader = false) => {
    const content = useHttpRequest ? fs.read(path) : http.request(path);

    if (useLocalInjectorLoader) {
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

    return result;
}