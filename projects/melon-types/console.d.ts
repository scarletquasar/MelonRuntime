import { ConsoleColor } from "./types/console/ConsoleColor"

type Console = {
    write(target: any, color: ConsoleColor): void,
    writeLine(target: any, color: ConsoleColor): void,
    log(...data: any): void,
    error(...data: any[]): void,
    warn(...data: any[]): void,
    clear(): void,
    table(tabularData?: any, properties?: string[]): void
}

declare const console: Console