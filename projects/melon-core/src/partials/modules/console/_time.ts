import { _Realm } from "../dotnet/constructors/_Realm";
import { _getStaticMethod } from "../dotnet/_getStaticMethod";
import { _console } from "./_console";

function _time(timerName: string) {
    _console._timers.setInstance(timerName, "System.Diagnostics:Stopwatch");
    const stopwatch = _console._timers.get<any>(timerName);

    stopwatch.start();
}

export { _time }