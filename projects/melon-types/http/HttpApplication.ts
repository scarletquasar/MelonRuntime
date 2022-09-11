import { CallbackFunction } from "./CallbackFunction";
import { HttpEndpoint } from "./HttpEndpoint";

interface HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;

    getEndpoints: () => HttpEndpoint[];
    get: (route: string, callback: CallbackFunction) => void;
    post: (route: string, callback: CallbackFunction) => void;
    delete: (route: string, callback: CallbackFunction) => void;
}

export { HttpApplication }