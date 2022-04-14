const console = {
    output: [],
    log: (object) => {
        console.output.push(object);
        melon_internal_console_log(object, 15);
    },
    error: (object) => {
        console.output.push(object);
        melon_internal_console_log('[X] ' + object, 12);
    },
    warn: (object) => {
        console.output.push(object);
        melon_internal_console_log('[!] ' + object, 14);
    },
    clear: (clearOutput = false) => {
        clearOutput ? output = [] : {}
        melon_internal_console_clear();
    }
};