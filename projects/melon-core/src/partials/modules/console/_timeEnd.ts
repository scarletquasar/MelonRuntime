import { _console } from "./_console";

function _timeEnd(timerName: string) {
    if (_console._timers[timerName]) {
        console.log(timerName + ': ' + (Date.now() - _console._timers[timerName]) + 'ms' );
        delete _console._timers[timerName];
    }
}

export { _timeEnd }