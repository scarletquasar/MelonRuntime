declare interface Object {
    $<TInput, TReturn>(caller: ((a: TInput, ...args: any[]) => TReturn), ...args: any[]): TReturn & { 
        $: typeof Object.$<TReturn, unknown>
    };
}