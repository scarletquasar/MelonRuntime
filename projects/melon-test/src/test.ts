const CliDotNet = xrequire("dotnet:Cli.NET.Tools");
const CLNConsole = CliDotNet.getType("CLNConsole");
const Write = CLNConsole.getMethod("Write");
 
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
                console.log('');
                passed ? Write.invoke(["", "[Ok]", 2]) : Write.invoke(["", "[Failed]", 4]);
                Write.invoke(["", this.description]);
            }

            return passed;
        };
        return this;
    }
}