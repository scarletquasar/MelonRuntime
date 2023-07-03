function $<TInput, TReturn>(caller: ((a: TInput, ...args: any[]) => TReturn), ...args: any[]) {
    return caller(this, ...args) as TReturn & { 
        $: typeof $
    };
}

export { $ }