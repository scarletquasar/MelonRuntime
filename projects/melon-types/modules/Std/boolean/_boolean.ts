declare type _boolean = {
    checkOne<T>(method: Function, values: T[]): boolean;
    checkAll<T>(method: Function, values: T[]): boolean;
}