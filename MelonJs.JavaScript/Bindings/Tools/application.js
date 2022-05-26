const application = {
    end: melon_internal_reset_current_execution,

    cache: {
        add: (key, value) => {
            melon_internal_cache.Add(key, value);
        },

        get: (key) => {
            return melon_internal_cache[key];
        },

        delete: (key) => {
            melon_internal_cache.Remove(key);
        },

        clear: () => {
            melon_internal_cache.Clear();
        }
    },

    name: melon_internal_application.Name,
    description: melon_internal_application.Description,
    author: melon_internal_application.Author,
    version: melon_internal_application.Version,
    website: melon_internal_application.Website,
    entryPoint: melon_internal_application.EntryPoint
}