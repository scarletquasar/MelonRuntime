declare type _time = {
    setInterval: (callback: Function, delay: number) => string;
    setTimeout: (callback: Function, delay: number) => string;
    clearInterval: (identifier: string) => void;
    clearTimeout: (identifier: string) => void;
}