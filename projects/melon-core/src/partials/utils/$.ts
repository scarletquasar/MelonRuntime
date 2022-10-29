function $(caller: (a: any, ...args: any[]) => any | Function, ...args: any[]) {
    return caller(this, ...args);
}

export { $ }