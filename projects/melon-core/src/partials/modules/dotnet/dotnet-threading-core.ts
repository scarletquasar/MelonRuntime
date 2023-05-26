import { _crypto } from "../../statics/_crypto";
import { _nextTick } from "../std/async/_nextTick";
import { getStaticProperty } from "./dotnet-interop-core";
import { InteropMethod } from "./dotnet-types";

function createThread(identifier: string) {
    return _$internalBinding["CreateThread"](identifier);
}

function createTask(action: Function) {
    return _$internalBinding["CreateTask"](action);
}

class Thread {
    private static threads: Record<string, Thread> = {};
    private interopThread: any;
    private interopAction: Function | Promise<any>;
    
    public identifier: string;

    constructor(action?: InteropMethod<any>) {
        this.interopAction = action;
        this.identifier = _crypto.randomUUID();
        this.interopThread = createThread(this.identifier);
        this.interopThread.isThreadPoolThread = true;

        Thread.threads[this.identifier] = this;
    }

    static get currentThread() {
        const currentInteropThread = getStaticProperty("System.Threading:Thread:CurrentThread");
        const thread = new Thread();
        thread.interopThread = currentInteropThread;

        return thread;
    }

    get isAlive() {
        return this.interopThread.isAlive;
    }

    get name() {
        return this.interopThread.name;
    }

    start() {
        this.interopThread.start();
    }

    unsafeStart() {
        this.interopThread.unsafeStart();
    }

    abort(exitCode = 0) {
        this.interopThread.abort(exitCode);
    }

    suspend() {
        this.interopThread.suspend();
    }

    resume() {
        this.interopThread.resume();
    }

    join() {
        this.interopThread.join();
    }

    yield() {
        this.interopThread.yield();
    }

    memoryBarrier() {
        this.interopThread.memoryBarrier();
    }

    beginCriticalRegion() {
        this.interopThread.beginCriticalRegion();
    }

    endCriticalRegion() {
        this.interopThread.endCriticalRegion();
    }

    unsafeGetInteropThread() {
        return this.interopThread;
    }

    unsafeGetInteropAction() {
        return this.interopAction;
    }

    unsafeSetInteropThread(interopThread: any) {
        this.interopThread = interopThread;
    }
}

class Task<T> {
    private interopTask: any;

    constructor(action: (...args: any[]) => T) {
        this.interopTask = createTask(action);
    }

    get isCanceled(): boolean {
        return this.interopTask.isCanceled;
    }

    get isCompleted(): boolean {
        return this.interopTask.isCompleted;
    }

    get isCompletedSuccessfully(): boolean {
        return this.interopTask.isCompletedSuccessfully;
    }

    get isFaulted(): boolean {
        return this.interopTask.isFaulted;
    }

    get result(): T {
        if(this.isCompleted)
            return this.interopTask.result;

        throw new Error("The task needs to be completed before getting it's result");
    }

    start() {
        this.interopTask.start();
    }

    wait() {
        this.interopTask.wait();
    }

    async resolve(cancellationFunction: () => boolean = () => false) {
        const promise = new Promise((resolve) => {
            const task = this.interopTask;
            this.start();
    
            const resolver = () => {
                if(cancellationFunction()) {
                    return null;
                }

                if (task.status == 4 || this.isCompleted) {
                    resolve(task.result);
                }
                
                return resolver();
            }
        });

        return promise;
    }

    unsafeGetInteropTask() {
        return this.interopTask;
    }
}

export { Thread, Task, createThread, createTask }