import { CallbackFunction } from "./CallbackFunction";

interface HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;

    get: (route: string, callback: CallbackFunction) => void;
    post: (route: string, callback: CallbackFunction) => void;
    delete: (route: string, callback: CallbackFunction) => void;
}

export { HttpApplication }