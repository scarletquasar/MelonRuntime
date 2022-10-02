import { DotnetInstanceExpression } from "../../../../types/dotnet/DotnetInstanceExpression";
import { Realm } from "../../../../types/dotnet/Realm";
declare class _Realm implements Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: <TResult>(name: string) => TResult;
    delete: (name: string) => void;
    close: (delay: number) => void;
    constructor(name?: string);
}
export { _Realm };
