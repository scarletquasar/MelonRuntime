import { _Realm } from "../dotnet/constructors/_Realm";
import { _clear } from "./_clear";
import { _table } from "./_table";
import { _time } from "./_time";
import { _timeEnd } from "./_timeEnd";
import { _write } from "./_write";
import { _writeLine } from "./_writeLine";
import { __callLogger } from "./__callLogger";

const _console = {
    _timers: new _Realm(),
    time: _time,
    timeEnd: _timeEnd,
    write: _write,
    writeLine: _writeLine,
    clear: _clear,
    table: _table,
    log: (...args: any[]) => __callLogger("White", args),
    error: (...args: any[]) => __callLogger("Red", args),
    warn: (...args: any[]) => __callLogger("Yellow", args)
}

export { _console }