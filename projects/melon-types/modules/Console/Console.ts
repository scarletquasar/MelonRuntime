declare type ConsoleColor =
    "Black" |
    "DarkBlue" |
    "DarkGreen" |
    "DarkCyan" |
    "DarkRed" |
    "DarkMagenta" |
    "DarkYellow" |
    "Gray" |
    "DarkGray" |
    "Blue" |
    "Green" |
    "Cyan" |
    "Red" |
    "Magenta" |
    "Yellow" |
    "White";

declare const Console: {
    time: (name: string) => void;
    timeEnd: (name: string) => void;
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    clear: () => void;
    table: (tabularData: any) => void;
    write: (object: any, color?: ConsoleColor) => void;
    writeLine: (object: any, color?: ConsoleColor) => void;
}

export { Console }