class Timer {
    active: boolean;
    callback: Function;
    
    constructor(callback: Function) {
        this.active = true;
        this.callback = callback;
    }

    clear() {
        this.active = false;
        this.callback = undefined;
    }
}

export { Timer }