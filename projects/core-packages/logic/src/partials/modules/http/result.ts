import { _std } from "../std/_std"
import { HttpResult } from "./constructors/HttpResult";

function result<T>(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
    const headersObject = {
        "Content-Type": "application/json",
        ...headers
    };

    const resultObject = new HttpResult<T>(statusCode, response, headersObject);

    return resultObject;
}

export { result }