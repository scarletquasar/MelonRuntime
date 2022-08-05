import { DotnetFetchExpression } from "./DotnetFetchExpression";

interface Realm {
    name: string;
    setValue(name: string, value: any): void;
    setInstance(name: string, expression: DotnetFetchExpression, ...parameters: any): void;
    get(name: string): any;
}

export { Realm }