import { getStaticMethod } from "logic/api/modules/dotnet/dotnet-interop-core";

const interopCache = {
    serialization: {
        serialize: getStaticMethod<string>("System.Text.Json:JsonSerializer:Serialize")
    },
    console: {
        write: getStaticMethod<void>("System:Console:WriteLine"),
        clear: getStaticMethod<void>("System:Console:Clear"),
        read: getStaticMethod<string | null>("System:Console:ReadLine")
    },
    io: {
        getFiles: getStaticMethod<string[]>("System.IO:Directory:GetFiles")
    }
}

export { interopCache }