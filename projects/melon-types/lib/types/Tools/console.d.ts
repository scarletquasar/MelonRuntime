type MConsole = {
    group(...data: any[]): void;
    error(...data: any[]): void;
    warn(...data: any[]): void;
    clear(): void;
    read(): void;
    table(tabularData?: any, properties?: string[]): void;
}

declare const console: MConsole