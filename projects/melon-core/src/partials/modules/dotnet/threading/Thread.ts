import { _crypto } from "../../../statics/_crypto";
import { _error } from "../../console/_error";
import { _nextTick } from "../../std/async/_nextTick";
import { getStaticProperty } from "../getStaticProperty";
import { createThread } from "./createThread";

type ThreadAction = (...args: any[]) => any;
type InteropThread = any;

class Thread {
    private static threads: Record<string, Thread> = {};

    private interopThread: InteropThread;
    private interopAction: Function | Promise<any>

    public identifier: string;

    constructor(action?: ThreadAction) {
        this.interopAction = action;

        this.identifier = _crypto.randomUUID();
        Thread.threads[this.identifier] = this;

        this.interopThread = createThread(this.identifier);
    }

    static panic(message?: string) {
        _error(message ?? "");
        Thread.currentThread.abort(101);
    }

    static get currentThread() {
        const interopThread = getStaticProperty<InteropThread>("System.Threading:Thread:CurrentThread");
        const thread = new Thread();

        thread.unsafeSetInteropThread(interopThread);

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

    abort(exitCode?: number) {
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

    unsafeSetInteropThread(interopThread: InteropThread) {
        this.interopThread = interopThread;
    }
}

export { Thread }