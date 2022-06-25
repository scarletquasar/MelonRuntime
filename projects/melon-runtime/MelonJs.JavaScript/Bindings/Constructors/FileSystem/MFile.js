class MFile {
    constructor(fileInfo = { name: "", content: null, encoding: "utf8" }) {
        //File Information
        this.fileName = fileInfo.name;
        this.lastWriteTime = fileInfo.lastWriteTime;
        this.creationTime = fileInfo.creationTime;
        this.encoding = fileInfo.encoding;

        //Operations
        this.path = fileInfo.path;

        const bytes = fileInfo.content != null
            ? melon_internal_convert.FromStringToByteArray(fileInfo.content, fileInfo.encoding)
            : fileInfo.bytes;

        const size = (bytes?.length / 1024);

        this.fileName = fileInfo.name;
        this.fileSize = size;
        this.bytes = bytes;
    }

    save(path) {
        __save_file__(path, this.bytes);
    }

    toString() {
        return __converter__.FromByteArrayToString(this.bytes, this.encoding);
    }

    lines() {
        return this.toString().split("\n");
    }
}

MFile.load = (path) => {
    const loadedFile = new __file__(path);

    return new File({
        name: loadedFile.Name,
        bytes: loadedFile.Bytes,
        encoding: loadedFile.Encoding,
        creationTime: loadedFile.CreationTime,
        latWriteTime: loadedFile.LastWriteTime,
        path: loadedFile.FilePath
    });
}

MFile.delete = (path) => {
    __delete_file__(path);
}

MFile.copy = (from, to) => {
    __copy_file__(from, to);
}

MFile.move = (from, to) => {
    __move_file__(from, to);
}