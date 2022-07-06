declare class HttpApplicationConstructorInternal {
    constructor(host: string, port: string, enableHttps: boolean);
    get: (route: string, callback: Function) => void;
    post: (route: string, callback: Function) => void;
    delete: (route: string, callback: Function) => void;
    run: () => void;
    listen: (port: string, host?: string) => void;
}