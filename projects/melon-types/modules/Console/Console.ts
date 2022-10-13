/**
 * The console object provides access to the debugging/output console
 * and is focused in showing information on the screen, using console
 * timers and debugging data.
 */
declare type Console = {
    time: (name: string) => void;
    timeEnd: (name: string) => void;
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    clear: () => void;
    table: (tabularData: any) => void;
}