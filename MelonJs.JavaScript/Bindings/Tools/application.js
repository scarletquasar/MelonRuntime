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
    }
}