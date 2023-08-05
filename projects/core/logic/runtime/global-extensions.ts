function and<TInput, TReturn>(caller: ((a: TInput, ...args: any[]) => TReturn), ...args: any[]) {
    return caller(this, ...args) as TReturn & { 
        and: typeof and
    };
}

export { and }