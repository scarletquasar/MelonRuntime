class ConstructorAssembler {
    constructor(constructorName, constructorArguments) {
        this.constructorName = String(constructorName);
        this.constructorArguments = Array.from(constructorArguments);
    }

    createInstance = () => {
        return eval(`new ${this.constructorName}(${this.constructorArguments.toString()})`)
    }
}