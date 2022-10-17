import { _std } from "../std/_std";
import { _readText } from "./_readText";

async function _readTextAsync(path: string): Promise<string> {
    const task = _$internalBinding["ReadFileTextAsync"](path);

    while(task.status <= 4) {
        await _std.async.nextTick(1);
    }

    return task.result;
}

export { _readTextAsync }