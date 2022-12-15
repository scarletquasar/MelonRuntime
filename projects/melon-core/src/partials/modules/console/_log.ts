import { getStaticMethod } from "../dotnet/getStaticMethod";
import { _std } from "../std/_std";

const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
const log = getStaticMethod<void>("System:Console:WriteLine");

function _log(...args: any[]) {
    Array.from(args).forEach(object => {
        const serialized = serialize(object)
            .replaceAll("\\n", "\n")
            .replaceAll("\\r", "\r");

        log(serialized);
    });
};

export { _log }