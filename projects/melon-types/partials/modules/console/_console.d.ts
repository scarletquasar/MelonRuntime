import { _error } from "./_error";
import { _log } from "./_log";
import { _table } from "./_table";
import { _warn } from "./_warn";
import { _write } from "./_write";
import { _writeLine } from "./_writeLine";
declare const _console: {
    log: typeof _log;
    write: typeof _write;
    writeLine: typeof _writeLine;
    error: typeof _error;
    warn: typeof _warn;
    clear: () => void;
    table: typeof _table;
};
export { _console };
