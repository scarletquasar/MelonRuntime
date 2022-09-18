declare interface HttpEndpoint { 
    route: string;
    method: string;
    callback: Function;
}