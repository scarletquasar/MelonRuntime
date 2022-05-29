const debug = {
    _logs: [],
    log: (message) => {
        console.warn(message)
        this._logs.push([Date.now(), message])
    },
    enableStackTracing: melon_internal_debug_set_stack_tracing,
    enableDetailedInformation: false
}