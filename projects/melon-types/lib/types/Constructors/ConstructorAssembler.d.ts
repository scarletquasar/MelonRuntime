declare interface ConstructorAssembler {
    constructorName: string,
    constructorArguments: any[],
    createInstance: () => any
}