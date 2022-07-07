class Test {
    description: string;
    private _assertions: boolean[];
    add: (value: boolean) => void;
    result: (log?: boolean) => Promise<boolean>;

    constructor(description: string) {
        this._assertions = [];
        this.description = description;
        this.add = (value: boolean) => void this._assertions.push(value);
        this.result = async (log = false) => {
            const passed = Promise.resolve(this._assertions.every((assertion) => assertion === true));
           
            if(log) {
                console.log(`${passed ? "[Ok]" : "[Failed]"} ${this.description}`);
            }

            return passed;
        };
        return this;
    }
}