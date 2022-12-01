import { _getStaticMethod } from "../dotnet/_getStaticMethod";
import { _std } from "../std/_std";

function _log(...args: any[]) {
    const serialize = _getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
    const log = _getStaticMethod("System:Console:WriteLine");

    Array.from(args).forEach(object => {
        const serialized = serialize(object)
            .replaceAll("\\n", "\n")
            .replaceAll("\\r", "\r");

        log(serialized);
    });
};

export { _log }