import { _createThread } from "./_createThread";

class _Thread {
    #__interop_thread: any;

    constructor(action: (...args: any[]) => void) {
        this.#__interop_thread = _createThread(action);
    }

    start() {
        this.#__interop_thread.start();
    }

    unsafeStart() {
        this.#__interop_thread.unsafeStart();
    }

    abort() {
        this.#__interop_thread.abort();
    }

    suspend() {
        this.#__interop_thread.suspend();
    }

    resume() {
        this.#__interop_thread.resume();
    }

    join() {
        this.#__interop_thread.join();
    }

    yield() {
        this.#__interop_thread.yield();
    }

    memoryBarrier() {
        this.#__interop_thread.memoryBarrier();
    }

    beginCriticalRegion() {
        this.#__interop_thread.beginCriticalRegion();
    }

    endCriticalRegion() {
        this.#__interop_thread.endCriticalRegion();
    }

    unsafeGetInteropThread() {
        return this.#__interop_thread;
    }
}

export { _Thread }