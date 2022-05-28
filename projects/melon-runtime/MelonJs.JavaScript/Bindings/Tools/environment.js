const environment = {
    getVariable: (name) => {
        return melon_internal_environment.GetEnvironmentVariables()[name] ?? melon_internal_environment_variables[name];
    },

    getVariables: () => Object.assign(melon_internal_environment.GetEnvironmentVariables()[name], melon_internal_environment_variables),

    setVariable: (name, content) => {
        melon_internal_environment_variables.Add(name, content);
    }
}