const deep_clone = (target) => {
    if (debug.enableDetailedInformation) {
        //Reference case for https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
        if (typeof object === 'function') {
            debug.log(`
                [MelonJS Debugger]: deep_clone may be slow and cause data loss due to the usage of
                JSON.parse() and JSON.stringify()

                Example:

                const a = {
                  string: 'string',
                  number: 123,
                  bool: false,
                  nul: null,
                  date: new Date(),  // stringified
                  undef: undefined,  // lost
                  inf: Infinity,  // forced to 'null'
                  re: /.*/,  // lost
                }

                console.log(a);
                console.log(typeof a.date);  // Date object
                const clone = JSON.parse(JSON.stringify(a));
                console.log(clone);
                console.log(typeof clone.date);  // result of .toISOString()
            `)
        }
    }
    return JSON.parse(JSON.stringify(eval(target)));
}