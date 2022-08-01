import { HttpApplicationEvent } from "./HttpApplicationEvent";
import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";

declare class HttpApplicationInternal {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    echoes: any[];
    routes: any[];
    on: (event: HttpApplicationEvent, action: (request: HttpRequest) => any) => void;
    use: (middleware: (request: HttpRequest) => any) => void;
    get: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    post: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    delete: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    run: () => void;
    listen: (port: number, host?: string) => void;
}

export { HttpApplicationInternal }