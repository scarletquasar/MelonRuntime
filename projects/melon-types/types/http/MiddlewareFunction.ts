import { HttpRequest } from "./HttpRequest";

type MiddlewareFunction = (request: HttpRequest) => any;

export { MiddlewareFunction }