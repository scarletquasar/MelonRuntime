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
    },
    readAllBytesSync: (path) => _$internalBinding["ReadFileBytes"](path),
    writeAllBytesSync: (path, bytes) => _$internalBinding["WriteFileBytes"](path, bytes),
    readAllBytesAsync: (path) => {
        const task = new AsyncTask(path => {
            const result = _$internalBinding["ReadFileBytes"](path);
            return result;
        }, [path]);

        return task.execute();
    },
    writeAllBytesAsync: (path, bytes) => {
        const task = new AsyncTask((path, bytes) => {
            _$internalBinding["WriteFileBytes"](path, bytes);
        }, [path, bytes]);

        return task.execute();
    }
}