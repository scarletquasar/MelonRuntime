const std = {
    Promise: Promise,
    shift: (value) => {
        const internal = {
            option: (target, callback) => {
                switch (typeof target) {
                    case "object":
                        target.includes(value) && callback(target[target.indexOf(value)]);
                        break;

                    default:
                        value === target && callback(target);
                        break;
                }
                return std.shift(value);
            }
        }
        return internal;
    },
    melon: {
        loadedModules: []
    },
    json: {
        tryParse: (target, options = { onErrorReturn: () => { return {} }, modifier: x => x }) => {
            try {
                return options.modifier(JSON.parse(target));
            }
            catch {
                return options.onErrorReturn(target);
            }
        },
        tryStringify: (target, options = { onErrorReturn: (value) => value.toString(), modifier: x => x }) => {
            try {
                return options.modifier(JSON.stringify(target));
            }
            catch {
                return options.onErrorReturn(target);
            }
        }
    },
    time: {
        _timers: [],
        setTimeout: (callback, delay) => {
            const identifier = () => std.time._timers.push({ callback }) - 1;
            _$internalBinding["SetTimeout"](identifier(), delay);
        },
        setInterval: (callback, delay) => {
            const identifier = () => std.time._timers.push({ callback }) - 1;
            _$internalBinding["SetInterval"](identifier(), delay);
        }
    },
    system: {
        osInformation: {
            platform: dotnet.getStaticProperty("System:Environment:OSVersion").Platform,
            version: dotnet.getStaticProperty("System:Environment:OSVersion").VersionString,
            servicePack: dotnet.getStaticProperty("System:Environment:OSVersion").ServicePack
        }
    },
    environment: {
        baseDirectory: dotnet.getStaticProperty("System:Environment:CurrentDirectory"),
        getEnvironmentVariables: () => {
            const localEnv = _$internalBinding["LocalEnvironmentVariables"];
            const processEnv = dotnet.getStaticMethod("System:Environment:GetEnvironmentVariables")();

            return Object.assign(localEnv, processEnv);
        },
        setEnvironmentVariable: (key, value) => {
            _$internalBinding["LocalEnvironmentVariables"][key] = value;
            std.process.env[key] = value;
        },
        clearLocalEnvironmentVariables: () => {
            _$internalBinding["LocalEnvironmentVariables"].Clear();
            std.process.env = _$internalBinding["ProcessEnvironmentVariables"];
        }
    },
    process: {
        argv: dotnet.getStaticMethod("System:Environment:GetCommandLineArgs")(),
        exit: _$internalBinding["ProcessExit"],
        env: Object.assign(_$internalBinding["LocalEnvironmentVariables"], _$internalBinding["ProcessEnvironmentVariables"])
    }
}