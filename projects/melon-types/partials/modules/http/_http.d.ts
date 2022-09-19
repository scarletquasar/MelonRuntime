import { _app } from "./_app";
import { _request } from "./_request";
import { _requestAsync } from "./_requestAsync";
import { _result } from "./_result";
import { _static } from "./_static";
declare const _http: {
    _apps: {};
    request: typeof _request;
    requestAsync: typeof _requestAsync;
    app: typeof _app;
    result: typeof _result;
    static: typeof _static;
};
export { _http };
