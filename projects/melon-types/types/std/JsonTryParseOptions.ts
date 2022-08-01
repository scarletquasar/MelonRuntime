type JsonTryParseOptions<T> = { 
    onErrorReturn: (value: string) => T, 
    modifier: (target: T) => T 
}

export { JsonTryParseOptions }