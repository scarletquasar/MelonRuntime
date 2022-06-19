const debug = {
    logs: [],
    log: (message) => {
        console.warn(message)
        debug.logs.push([Date.now(), message])
    },
    enableStackTracing: __debug_set_stack_tracing__,
    enableDetailedInformation: false
}