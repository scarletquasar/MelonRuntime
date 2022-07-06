Melon.debug = {
    logs: [],
    log: (message) => {
        Melon.console.warn(message);
        Melon.debug.logs.push([Date.now(), message]);
    },
    /*
     * debug.details(...arguments)
     * Displays information about the target objects, focused in debug
     * */
    details: function () {
        Array.from(arguments).forEach(object => {
            Melon.console._detailedDebugCheck(object);
            __console_details__(object, 15);
        })
    },
    enableStackTracing: __debug_set_stack_tracing__,
    enableDetailedInformation: false
}