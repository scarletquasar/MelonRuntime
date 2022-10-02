declare function _static(response: any, type: `${string}/${string}`, headers?: Record<string, any>): {
    status: number;
    response: any;
    headers: string;
};
export { _static };
