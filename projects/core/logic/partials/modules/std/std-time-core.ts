import { _crypto } from "../../statics/_Crypto";

class RepeatableTimer {
    public callback: Function;
    public time: number;
    public cancelled: boolean;

    constructor(callback: Function, time: number) {
        this.callback = callback;
        this.time = time;
    }

    private async fire(): Promise<void> {
        const actualMoment = Date.now();

        if (actualMoment >= this.time) {
            this.callback();
            return;
        }
        
        if (!this.cancelled) {
            return await this.fire();
        }
    }
}

const timers = {} as Record<string, RepeatableTimer>;

function setTimeout(callback: Function, delay: number) {
    const id = _crypto.randomUUID();
    timers[id] = new RepeatableTimer(callback, delay);
    (<any>timers[id]).fire();    
    return id;
}

export { timers, setTimeout }