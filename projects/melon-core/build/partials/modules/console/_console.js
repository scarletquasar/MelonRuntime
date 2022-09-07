import { _clear } from "./_clear";
import { _error } from "./_error";
import { _log } from "./_log";
import { _table } from "./_table";
import { _warn } from "./_warn";
import { _write } from "./_write";
import { _writeLine } from "./_writeLine";
const _console = {
    log: _log,
    write: _write,
    writeLine: _writeLine,
    error: _error,
    warn: _warn,
    clear: _clear,
    table: _table
};
export { _console };
