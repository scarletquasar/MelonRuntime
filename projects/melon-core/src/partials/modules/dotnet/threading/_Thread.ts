import { _createThread } from "./_createThread";

type ThreadAction = (...args: any[]) => any;

class _Thread {
    private interopThread: any;

    constructor(action: ThreadAction) {
        this.interopThread = _createThread(action);
    }

    start() {
        this.interopThread.start();
    }

    unsafeStart() {
        this.interopThread.unsafeStart();
    }

    abort() {
        this.interopThread.abort();
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
}

export { _Thread }