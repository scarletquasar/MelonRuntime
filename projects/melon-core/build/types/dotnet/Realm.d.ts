import { DotnetInstanceExpression } from "./DotnetInstanceExpression";
import { InteropResult } from "./InteropResult";
interface Realm {
    name: string;
    setValue(name: string, value: any): void;
    setInstance(name: string, expression: DotnetInstanceExpression, ...parameters: any): void;
    get(name: string): InteropResult;
}
export { Realm };
