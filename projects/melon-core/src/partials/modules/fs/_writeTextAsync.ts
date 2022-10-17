import { _std } from "../std/_std";
import { _writeText } from "./_writeText"

async function _writeTextAsync(path: string, content: string) {
    const task = _$internalBinding["WriteFileTextAsync"](path, content);
    
    while(task.status <= 4) {
        await _std.async.nextTick(1);
    }
}

export { _writeTextAsync }