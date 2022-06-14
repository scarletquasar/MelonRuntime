const debug = {
    //Info: Debug logs disabled due to a 'undefined' problem
    //_logs: [],
    log: (message) => {
        console.warn(message)
        //this._logs.push([Date.now(), message])
    },
    enableStackTracing: __debug_set_stack_tracing__,
    enableDetailedInformation: false
}