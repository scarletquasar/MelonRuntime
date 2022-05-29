const getEsprimaDeclarationPatternValue = (input) => {
    let value;
    const name = input.id.name;

    //TODO: ADD SUPPORT TO ArrowFunctionExpression AND FunctionExpression
    const getValueByTokenType = {
        "Literal": () => { value = input.init.value; },
        "ArrayExpression": () => {
            value = [];

            input.init.elements.forEach(element => {
                value.push(getEsprimaDeclarationPatternValue(element.value));
            });
        },
        "ObjectExpression": () => {
            value = {};

            input.init.properties.forEach(property => {
                value[property.key.name] = getEsprimaDeclarationPatternValue(property.value.value);
            });
        },
        "NewExpression": () => {
            value = new ConstructorAssembler(input.init.callee.name, input.init.arguments);
        }
    }

    getValueByTokenType[input.init.type]();

    return {
        name,
        value
    };
}