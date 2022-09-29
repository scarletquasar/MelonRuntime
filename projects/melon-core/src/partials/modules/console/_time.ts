import { _console } from "./_console";

function _time(timerName: string) {
    _console._timers[timerName] = Date.now();
}

export { _time }