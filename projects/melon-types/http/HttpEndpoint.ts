interface HttpEndpoint { 
    route: string;
    method: string;
    callback: Function;
}

export { HttpEndpoint }