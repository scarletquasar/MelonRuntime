type ConsoleLog = (...args: any[]) => void;
type ConsoleWrite = (object: any) => void;
type ConsoleWriteLine = (object: any) => void;
type ConsoleTable = (data: any[], columns: any[]) => void;
type ConsoleError = (...args: any[]) => void;
type ConsoleWarning = (...args: any[]) => void;
type ConsoleTime = (timerName: string) => void;
type ConsoleTimeEnd = (timerName: string) => void;
type ConsoleClear = () => void;

export {
    ConsoleLog,
    ConsoleWrite,
    ConsoleWriteLine,
    ConsoleTable,
    ConsoleError,
    ConsoleWarning,
    ConsoleTime,
    ConsoleTimeEnd,
    ConsoleClear
}