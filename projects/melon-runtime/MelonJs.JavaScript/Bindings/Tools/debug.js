const debug = {
    _logs: [],
    log: (message) => {
        console.warn(message)
        this._logs.push([Date.now(), message])
    },
    enableStackTracing: __debug_set_stack_tracing__,
    enableDetailedInformation: false
}