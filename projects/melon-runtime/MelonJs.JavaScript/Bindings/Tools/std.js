const std = {
    /*
     * std.shift(valueToBeTurnedIntoOption)
     * The shift function provides an endless chain of callback options that can 
     * be called in the same way as a "switch-case", but allowing the use of logical 
     * conditionals and can be called even after its initial use, as an infinite chain
     * */
    shift: (value) => {
        const internal = {
            option: (target, callback) => {
                switch (typeof target) {
                    case "object":
                        target.includes(value) && callback(target[target.indexOf(value)])
                        break

                    default:
                        value === target && callback(target)
                        break
                }
                return shift(value);
            }
        }
        return internal
    },
    /*
     * std.reflect(targetNameAsString)
     * The reflect function is a sugar that promotes a direct reflection to a value denoted 
     * by its name in the form of a string inside the global code, this method should not be 
     * specific actively used as it may not work in cases like complex objects
     * */
    reflect: (target) => {
        if (enableDetailedInformation) {
            console.log
                ("[Debug] This method should not be actively used as it may not work in specific cases like complex objects");
        }

        this.name = target;
        this.modificator = x => x;
        this.getValue = () => this.modificator(eval(`${this.name}`))

        return this;
    },
    /*
     * std.system.*
     * The reflect function is a sugar that promotes a direct reflection to a value denoted
     * by its name in the form of a string inside the global code, this method should not be
     * specific actively used as it may not work in cases like complex objects
     * */
    system: {
        getBaseFolder: () => __basedir__;
    },
    /*
     * std.path.*
     * Offers options related to managing directory paths, initially created for internal use-
     * */
    path: {
        getFolderPath: (fullPath) => __getfolderpath__(fullPath);
    },
    /*
     * std.workers
     * Offers option for worker management, asynchronous binding with .NET asynchronous tasks for 
     * parallel data resolution/callback/population
     * */
    _workers: {},
    workers: {
        add: (name, script, callback) => {
            __workers_add__(name, script);

            std._workers[name] = {
                result: null,
                callback,
                start: () => __workers_start__(name)
            };
        },
        get: (name) => std._workers[name],
        remove: (name) => {
            __workers_remove__(name);
            std._workers[name] = null;
        },
        clear: () => __workers_clear__()
    },
    /*
     * std.arguments
     * The command line arguments passed to MelonRuntime
     * */
    arguments: () => __arguments__
}