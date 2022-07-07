declare class Test {
    description: string;
    private _assertions;
    add: (value: boolean) => Test;
    result: (log?: boolean) => Promise<boolean>;
    constructor(description: string);
}
export { Test };
