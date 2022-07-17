const fs = {
    readAllTextSync: (path) => _$internalBinding["ReadFileTextSync"](path),
    writeAllTextSync: (path, content) => _$internalBinding["WriteFileTextSync"](path, content)
}