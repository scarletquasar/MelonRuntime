import { _std } from "../_std";

class _Timer {
    #activator: () => Promise<void>;
    #repeat: boolean;
    #cancelled: boolean;

    constructor(callback: Function, delay: number, repeat: boolean) {
        const activator = async () => {
            await _std.async.nextTick(delay);
            callback();
        };

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