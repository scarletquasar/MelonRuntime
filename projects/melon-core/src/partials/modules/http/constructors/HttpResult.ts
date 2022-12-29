import { getStaticMethod } from "../../dotnet/getStaticMethod";

type CorsOptions = {
    origin?: string,
    methods?: string[],
    headers?: string[]
}

class HttpResult<T> {
    public status: number;
    public response: string;
    public headers: string;

    private serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");

    constructor(status: number, response: T, headers: Record<string, any>) {
        this.status = status;
        this.response = this.serialize(response);
        this.headers = this.serialize(headers);
    }

    useCors(options: CorsOptions) {
        const headers = JSON.parse(this.headers);

        headers["Access-Control-Allow-Headers"] = options.headers ? options.headers.toString() : "*";
        headers["Access-Control-Request-Methods"] = options.methods ? options.methods.toString() : "*";
        headers["Access-Control-Allow-Origin"] = options.origin ? options.origin : "*";

        this.headers = this.serialize(headers);
    }
}

export { HttpResult }