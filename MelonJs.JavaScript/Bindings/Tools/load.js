const load = (path, useHttpRequest = true, useLocalInjectorLoader = true) => {
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



        }

        return value;
    }

    parsed.forEach(item => {
        
        item.declarations

    });
}