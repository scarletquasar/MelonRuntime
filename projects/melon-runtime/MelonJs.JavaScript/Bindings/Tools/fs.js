Melon.fs = {
    readAllTextSync: (path) => {
        return __fs_read__(path);
    },
    writeAllTextSync: (path, content) => {
        __fs_write__(path, content)
    }
}