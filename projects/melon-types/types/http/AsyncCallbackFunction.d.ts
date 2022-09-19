import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";
declare type AsyncCallbackFunction = (request: HttpRequest) => Promise<string> | Promise<HttpComposedResponse>;
export { AsyncCallbackFunction };
