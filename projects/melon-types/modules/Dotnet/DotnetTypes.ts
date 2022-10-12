declare type DotnetFetchExpession = `${string}:${string}:${string}`;
declare type DotnetInstanceExpression = `${string}:${string}${'' | ':'}${'' | string}`;

declare interface Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: <TResult>(name: string) => TResult;
    delete: (name: string) => void;
    close: (delay: number) => void;
}

declare interface Task<T> {
    isCanceled: boolean;
    isCompleted: boolean;
    isCompletedSuccessfully: boolean;
    isFaulted: boolean;
    result: T;
    start: () => void;
    wait: () => void;
    resolve: (cancellationFunction?: () => boolean) => Promise<T>;
    unsafeGetInteropTask: () => any;
}

declare interface Thread {
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
}