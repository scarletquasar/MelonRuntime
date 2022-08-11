import { CallbackFunction } from "./CallbackFunction";
import { HttpApplicationEvent } from "./HttpApplicationEvent";
import { HttpRoute, HttpRouteMethod } from "./HttpRoute";
import { HttpRouteString } from "./HttpRouteString";
import { MiddlewareFunction } from "./MiddlewareFunction";

declare class HttpApplicationInternal {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    echoes: any[];
    routes: HttpRoute[];
    on: (event: HttpApplicationEvent, action: MiddlewareFunction) => void;
    use: (middleware: MiddlewareFunction) => void;
    route: (route: HttpRouteString, method: HttpRouteMethod, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    get: (route: HttpRouteString, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    post: (route: HttpRouteString, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    delete: (route: HttpRouteString, callback: CallbackFunction, middlewares?: MiddlewareFunction[]) => void;
    run: () => void;
    listen: (port: number, host?: string) => void;
}

export { HttpApplicationInternal }