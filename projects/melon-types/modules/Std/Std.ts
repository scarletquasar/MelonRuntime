declare const Std: {
    shift(): _shift,
    async: _async,
    melon: _melon,
    boolean: _boolean,
    json: _json,
    time: _time,
    system: _system,
    environment: _environment,
    process: _process,
    SharedBag: new<T>(...content: T[]) => SharedBag<T>,
}

export { Std }