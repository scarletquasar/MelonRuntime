declare type Queue = (callbackArray: Function[]) => {
    run: (condition: any) => boolean
}