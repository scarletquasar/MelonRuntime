import { DotnetFetchExpression } from "./DotnetFetchExpression";

interface Realm {
    name: string;
    setPropByValue(name: string, value: any): void;
    setPropByInstance(name: string, expression: DotnetFetchExpression, ...parameters: any): void;
    getProp(name: string): any;
}

export { Realm }