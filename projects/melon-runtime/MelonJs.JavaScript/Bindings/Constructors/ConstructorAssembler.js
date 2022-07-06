class ConstructorAssembler {
    constructor(constructorName, constructorArguments) {
        this.constructorName = String(constructorName);
        this.constructorArguments = Array.from(constructorArguments);

        this.createInstance = () => {
            return eval(`new ${this.constructorName}(${this.constructorArguments.toString()})`)
        }
    }
}