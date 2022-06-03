const fs = {
    read: (path) => {
        return __fs_read__(path);
    },
    write: (path, content) => {
        __fs_write__(path, content);
    }
};