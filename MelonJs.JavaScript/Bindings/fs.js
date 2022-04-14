const fs = {
    read: (path) => {
        return melon_internal_fs_read(path);
    },
    write: (path, content) => {
        melon_internal_fs_write(path, content);
    }
};