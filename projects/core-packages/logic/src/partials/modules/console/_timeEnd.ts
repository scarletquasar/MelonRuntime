import { _console } from "./_console";

function _timeEnd(timerName: string) {
    const stopwatch = _console._timers.get<any>(timerName);
    stopwatch.stop();

    _console.writeLine(timerName + ": " + stopwatch.elapsedMilliseconds + "ms");
}

export { _timeEnd }