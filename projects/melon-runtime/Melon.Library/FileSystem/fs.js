const fs = {
    readAllTextSync: (path) => _$internalBinding["ReadFileText"](path),
    writeAllTextSync: (path, content) => _$internalBinding["WriteFileText"](path, content),
    readAllTextAsync: (path) => {
        const task = new AsyncTask(path => {
            const result = _$internalBinding["ReadFileText"](path);
            return result;
        }, [path]);

        return task.execute();
    },
    writeAllTextAsync: (path, content) => {
        const task = new AsyncTask((path, content) => {
            _$internalBinding["WriteFileText"](path, content);
        }, [path, content]);

        return task.execute();
    }
}