type JsonTryStringifyOptions = { 
    onErrorReturn: (value: string) => string, 
    modifier: (target: string) => string 
}

export { JsonTryStringifyOptions }