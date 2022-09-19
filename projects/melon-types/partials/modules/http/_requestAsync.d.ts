import { _Response } from "./constructors/_Response";
declare function _requestAsync(target: string, method?: string, body?: Record<string, any>, headers?: Record<string, any>): Promise<_Response>;
export { _requestAsync };
