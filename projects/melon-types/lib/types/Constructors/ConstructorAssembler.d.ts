declare interface ConstructorAssembler {
    constructorName: string,
    constructorArguments: any[],
    createInstance: () => any
}

declare const ConstructorAssembler: (constructorName: string, constructorArguments: any[]) => void