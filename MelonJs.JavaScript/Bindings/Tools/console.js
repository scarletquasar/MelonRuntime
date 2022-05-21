const console = {
    log: (object) => {
        melon_internal_console_log(object, 15);
    },

    error: (object) => {
        melon_internal_console_log('[X] ' + object, 12);
    },

    warn: (object) => {
        melon_internal_console_log('[!] ' + object, 14);
    },

    clear: () => {
        melon_internal_console_clear();
    },

    read: () => {
        return melon_internal_conrole_readLine();
    }
};