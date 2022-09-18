declare type Console = {
    write: (target: any, color?: ConsoleColor) => void,
    writeLine: (target: any, color?: ConsoleColor) => void,
    log: (...args: any[]) => void,
    error: (...args: any[]) => void,
    warn: (...args: any[]) => void,
    clear: () => void,
    table: (data: any[], columns: any[]) => void 
}