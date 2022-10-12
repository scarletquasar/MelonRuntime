declare type DotnetFetchExpession = `${string}:${string}:${string}`;
declare type DotnetInstanceExpression = `${string}:${string}${'' | ':'}${'' | string}`;

declare interface Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: <TResult>(name: string) => TResult;
    delete: (name: string) => void;
    close: (delay: number) => void;
}