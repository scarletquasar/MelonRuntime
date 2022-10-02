import { AsyncCallbackFunction } from "../../../../types/http/AsyncCallbackFunction";
import { CallbackFunction } from "../../../../types/http/CallbackFunction";
import { _HttpEndpoint } from "./_HttpEndpoint";
declare class _HttpApplication {
    #private;
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    constructor(name: string, host: string, port: number, enableHttps?: boolean);
    getEndpoints(): _HttpEndpoint[];
    get(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    post(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    delete(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    listen(port: number, host?: string): void;
    run(): void;
}
export { _HttpApplication };
