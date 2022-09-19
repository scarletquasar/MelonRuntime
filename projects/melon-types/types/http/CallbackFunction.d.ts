import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";
declare type CallbackFunction = (request: HttpRequest) => string | HttpComposedResponse;
export { CallbackFunction };
