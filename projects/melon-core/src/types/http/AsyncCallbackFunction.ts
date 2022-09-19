import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";

type AsyncCallbackFunction = (request: HttpRequest) => Promise<string> | Promise<HttpComposedResponse>;

export { AsyncCallbackFunction }