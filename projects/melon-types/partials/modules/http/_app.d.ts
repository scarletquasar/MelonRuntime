import { _HttpApplication } from "./constructors/_HttpApplication";
declare function _app(options?: {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
}): _HttpApplication;
export { _app };
