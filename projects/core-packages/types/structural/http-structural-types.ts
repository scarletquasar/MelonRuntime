import { MimeType } from "../internal/generic-types";
import { 
    HttpApplication, 
    HttpApplicationOptions, 
    HttpResponse, 
    HttpResult 
} from "../internal/http-types";

type HttpRequestSync = (
    target: string,
    method?: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
) => HttpResponse;

type HttpFetch = (
    target: string,
    options: Record<string, any>
) => Promise<HttpResponse>;

type HttpRequestAsync = (
    target: string,
    method?: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
) => Promise<HttpResponse>;

type HttpFuncResult = <T>(statusCode: number, response?: any, headers?: Record<string, any>) => HttpResult<T>;
type HttpFuncStatic = (response: any, type: MimeType, headers?: Record<string, any>) => HttpComposedResponse; 
type HttpFuncApp = (options: HttpApplicationOptions) => HttpApplication;

export { 
    HttpRequestSync, 
    HttpFetch, 
    HttpRequestAsync,
    HttpFuncResult,
    HttpFuncStatic,
    HttpFuncApp
}