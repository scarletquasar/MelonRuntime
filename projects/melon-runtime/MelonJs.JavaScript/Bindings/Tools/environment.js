const environment = {
    getVariable: (name) => {
        return __environment__.GetEnvironmentVariables()[name] ?? __environment_vars__[name];
    },

    getVariables: () => Object.assign(__environment__.GetEnvironmentVariables()[name], __environment_vars__),

    setVariable: (name, content) => {
        __environment_vars__.Add(name, content);
    }
}