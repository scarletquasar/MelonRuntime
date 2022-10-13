declare type _json = {
    tryParse<T>(json: string): T;
    tryStringify(object: any): string;
}