declare type DotnetFetchExpession = `${string}:${string}:${string}`;
declare type DotnetInstanceExpression = `${string}:${string}${'' | ':'}${'' | string}`;
declare type ThreadAction = (...args: any[]) => any;

declare interface Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: <TResult>(name: string) => TResult;
    delete: (name: string) => void;
    close: (delay: number) => void;
}

declare class Task<T> {
    constructor(action: (...args: any[]) => T);
    get isCanceled(): boolean;
    get isCompleted(): boolean;
    get isCompletedSuccessfully(): boolean;
    get isFaulted(): boolean;
    result: T;
    start: () => void;
    wait: () => void;
    resolve: () => Promise<T>;
    unsafeGetInteropTask: () => any;
}

declare class Thread {
    constructor(action: (...args: any[]) => any);
    static get currentThread(): Thread;
    get isAlive(): boolean;
    start: () => void;
    unsafeStart: () => void;
    abort: () => void;
    suspend: () => void;
    resume: () => void;
    join: () => void;
    yield: () => void;
    memoryBarrier: () => void;
    beginCriticalRegion: () => void;
    endCriticalRegion: () => void;
    unsafeGetInteropThread: () => any;
    unsafeGetInteropAction: () => ThreadAction;
    unsafeSetInteropThread: (interopThread: any) => void;
}