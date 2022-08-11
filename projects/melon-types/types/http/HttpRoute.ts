import { AnyCasingString } from "../helpers/AnyCasingString";

type HttpRouteMethodBase = "GET" | "POST" | "DELETE";
type HttpRouteMethod = AnyCasingString<HttpRouteMethodBase>;

type HttpRoute = {
    route: string,
    method: HttpRouteMethod
}

export { HttpRoute, HttpRouteMethod }