import { DotnetInstanceExpression } from "../../../../types/dotnet/DotnetInstanceExpression";
import { InteropResult } from "../../../../types/dotnet/InteropResult";
import { Realm } from "../../../../types/dotnet/Realm";
declare class _Realm implements Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: (name: string) => InteropResult;
    constructor(name?: string);
}
export { _Realm };
