const std = {
    Promise: Promise,
    Response: class {
        constructor(body, headers, latency, statusCode, ok) {
            this.body = body;
            this.headers = headers;
            this.latency = latency;
            this.statusCode = statusCode;
            this.ok = ok;
        }

        json() {
            return JSON.parse(this.body);
        }

        text() {
            return this.body;
        }
    },
    PingResponse: class {
        constructor(results, max, min, average) {
            this.results = results;
            this.max = max;
            this.min = min;
            this.average = average;
        }
    },
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
    system: {
        osInformation: _$internalBinding["OsInformation"]
    },
    environment: {
        currentDirectory: _$internalBinding["CurrentDirectory"],
        baseDirectory: () => _$internalBinding["BaseDirectory"](),

        getEnvironmentVariables: () => {
            const localEnv = _$internalBinding["LocalEnvironmentVariables"];
            const processEnv = _$internalBinding["ProcessEnvironmentVariables"];

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
        argv: _$internalBinding["ArgumentsVector"],
        exit: _$internalBinding["ProcessExit"],
        env: Object.assign(_$internalBinding["LocalEnvironmentVariables"], _$internalBinding["ProcessEnvironmentVariables"])
    }
}