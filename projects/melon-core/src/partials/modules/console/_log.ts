import { OutputFriendly } from "../../../types/generic-types";
import { getStaticMethod } from "../dotnet/getStaticMethod";
import { _std } from "../std/_std";

const serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");
const log = getStaticMethod<void>("System:Console:WriteLine");

function _log(...args: any[]) {
    Array.from(args).forEach((object: OutputFriendly) => {
        const logObject = object.toLoggableOutput ? object.toLoggableOutput() : object;
        const serialized = serialize(logObject)
        .replaceAll("\\n", "\n")
        .replaceAll("\\r", "\r");

        log(serialized);
    });
};

export { _log }