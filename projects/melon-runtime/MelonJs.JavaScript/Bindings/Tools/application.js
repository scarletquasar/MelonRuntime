Melon.application = {
    /*
     * application.end()
     * Function to call the termination of the current loaded application, it also cleans 
     * the internal cache and restarts the engine that is currently running (info: the 
     * functionality causes total loss of running data)
     * */
    end: () => {
        Melon.application.cache.clear();

        if (Melon.application.cache.length() > 0) {
            throw new Error("An error has occurred trying to clear the application cache.");
        }

        Melon.application.name = '';
        Melon.application.description =  '';
        Melon.application.author = '';
        Melon.application.version = '';
        Melon.application.website = '';
        Melon.application.entryPoint = '';

        __basedir__ = '';
        __reset_current_execution__();
    },
    /*
     * application.cache.*
     * Offers options for managing the application's internal cache, as well as queries 
     * via [Key|Value], cleaning tools and verifications
     * */
    cache: {
        add: (key, value) => {
            __cache__.Add(key, value);
        },
        get: (key) => {
            return __cache__[key];
        },
        delete: (key) => {
            __cache__.Remove(key);
        },
        clear: () => {
            __cache__.Clear();
        },
        length: () => {
            return __cache__.Count();
        }
    },
    /*
     * application.baseDir
     * Returns the base directory of the current loaded application
     * */
    baseDir: () => __basedir__,
    /*
     * application.[name|description|author|version|website|entryPoint]
     * The currently loaded application information from "melon.js"
     * */
    name: __application__.Name,
    description: __application__.Description,
    author: __application__.Author,
    version: __application__.Version,
    website: __application__.Website,
    entryPoint: __application__.EntryPoint
}