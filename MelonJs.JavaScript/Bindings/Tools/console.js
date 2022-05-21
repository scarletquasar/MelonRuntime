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
    },

    table: (object) => {
        let res = [];

        if (Array.isArray(object)) {
            object.forEach(item => {
                res.push(`|${item}|`);
            })
        }

        switch (typeof object) {
            case "object":
                Object.entries(object).forEach(entry => {
                    res.push(`|${entry[0]}|${entry[1]}|`);
                });
                break;

            default:
                res.push(`|${object}|`);
                break;
        }

        res.forEach(console.log);
    }
};