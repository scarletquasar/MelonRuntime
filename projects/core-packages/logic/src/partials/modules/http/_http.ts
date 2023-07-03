import { _HttpEndpoint } from "./constructors/_HttpEndpoint"
import { _Response } from "./constructors/_Response"
import { _app } from "./_app"
import { _fetch } from "./_fetch"
import { _request } from "./_request"
import { _requestAsync } from "./_requestAsync"
import { result } from "./result"
import { _static } from "./_static"

const _http = {
    _apps: {},
    request: _request,
    requestAsync: _requestAsync,
    app: _app,
    result,
    static: _static,
    fetch: _fetch
}

export { _http }