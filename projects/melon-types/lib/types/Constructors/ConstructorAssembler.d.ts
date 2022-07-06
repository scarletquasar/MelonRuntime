declare class ConstructorAssemblerConstructorInternal {
    constructor(constructorName: string, constructorArguments: any[]);
    constructorName: string;
    constructorArguments: any[];
    createInstance: () => any;
}