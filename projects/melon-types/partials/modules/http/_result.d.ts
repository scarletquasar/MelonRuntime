declare function _result(statusCode: number, response?: any, headers?: Record<string, any>): {
    status: number;
    response: string;
    headers: string;
};
export { _result };
