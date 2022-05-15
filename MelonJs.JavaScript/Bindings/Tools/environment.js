const environment = {
    getVariable: (name) => {
        return melon_internal_get_environment_variables()[name] ?? melon_internal_environment_variables[name];
    },

    getVariables: () => Object.assign(melon_internal_get_environment_variables(), melon_internal_environment_variables),

    setVariable: (name, content) => {
        melon_internal_environment_variables.Add(name, content);
    }
}