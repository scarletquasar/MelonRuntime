import { _std } from "../_std";

class _Timer {
    #activator: () => Promise<void>;
    #repeat: boolean;
    #cancelled: boolean;

    constructor(callback: Function, delay: number, repeat: boolean) {
        const activator = async () => {
            var unixtime_ms = new Date().getTime();
            while(new Date().getTime() < unixtime_ms + delay) {
                await (async () => null)();
            }
    
            callback();
        }

        this.#activator = activator;
        this.#repeat = repeat;

        this.#start();
    }

    async #start() {
        if(!this.#cancelled) {
            await this.#activator();

            if(this.#repeat) {
                await this.#start();
            }
        }
    }

    cancel() {
        this.#cancelled = true;
    }
}

export { _Timer }