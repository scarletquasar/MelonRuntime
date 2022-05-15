const environment = {
    _vars: {},

    getVariable: (name) => {
        const externalVariables = melon_internal_get_environment_variables()[name];
        return Object.assign(externalVariables, environment._vars);
    },

    getVariables: melon_internal_get_environment_variables,

    setVariable: (name, content) => {
        environment._vars[name] = content;
    }
}