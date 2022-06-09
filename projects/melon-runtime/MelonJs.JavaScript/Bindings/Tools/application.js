const application = {
    end: __reset_current_execution__,

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
        }
    },

    currentDir: __basedir__,
    baseDir: __basedir__,
    name: __application__.Name,
    description: __application__.Description,
    author: __application__.Author,
    version: __application__.Version,
    website: __application__.Website,
    entryPoint: __application__.EntryPoint
}