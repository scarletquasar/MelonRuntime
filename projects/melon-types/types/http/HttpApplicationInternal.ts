import { CallbackFunction } from "./CallbackFunction";
import { HttpApplicationEvent } from "./HttpApplicationEvent";
import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";
import { MiddlewareFunction } from "./MiddlewareFunction";

declare class HttpApplicationInternal {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    echoes: any[];
    routes: any[];
    on: (event: HttpApplicationEvent, action: (request: HttpRequest) => any) => void;
    use: (middleware: MiddlewareFunction) => void;
    get: (route: string, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    post: (route: string, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    delete: (route: string, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    run: () => void;
    listen: (port: number, host?: string) => void;
}

export { HttpApplicationInternal }