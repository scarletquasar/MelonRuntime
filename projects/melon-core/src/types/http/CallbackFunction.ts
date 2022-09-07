import { HttpComposedResponse } from "./HttpComposedResponse";
import { HttpRequest } from "./HttpRequest";

type CallbackFunction = (request: HttpRequest) => string | HttpComposedResponse;

export { CallbackFunction }