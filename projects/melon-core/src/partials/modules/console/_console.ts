import { _Realm } from "../dotnet/constructors/_Realm";
import { _clear } from "./_clear";
import { _error } from "./_error";
import { _log } from "./_log";
import { _table } from "./_table";
import { _time } from "./_time";
import { _timeEnd } from "./_timeEnd";
import { _warn } from "./_warn";
import { _write } from "./_write";
import { _writeLine } from "./_writeLine";

const _console = {
    _timers: new _Realm(),
    time: _time,
    timeEnd: _timeEnd,
    log: _log,
    write: _write,
    writeLine: _writeLine,
    error: _error,
    warn: _warn,
    clear: _clear,
    table: _table
}

export { _console }