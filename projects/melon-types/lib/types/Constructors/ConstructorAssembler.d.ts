declare type ConstructorAssembler = (constructorName: string, constructorArguments: any[]) => {
    constructorName: string,
    constructorArguments: any[],
    createInstance: () => any
}