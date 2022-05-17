class File {
    static test = 1;

    //File Content
    bytes = [];

    constructor(fileInfo = { name: "", content: "", encoding: "utf8" }) {
        //Path
        this.path = null;

        //File Information
        this.fileName = null;
        this.fileSize = null;
        this.lastWriteTime = null;
        this.creationTime = null;

        //Object Limits
        this.fileSizeLimit = fileInfo.sizeLimit ?? 10000; //Measured in kb
        this.fileNameSizeLimit = fileInfo.nameSizeLimit ?? 64; //Measured in characters
        this.notAllowedFileNameExpressions = fileInfo.notAllowedFileNameExpressions ?? [];
        this.notAllowedFileExtensions = fileInfo.notAllowedFileExtensions ?? [];

        //Operations
        this.path = fileInfo.path;

        const bytes = melon_internal_convert.ToByteArray(fileInfo.content, fileInfo.encoding);
        const size = (bytes.length / 1024);

        if (size > this.fileSizeLimit)
            throw new Error(FILE_ERRORS.INCORRECT_FILE_SIZE);

        if (this.notAllowedFileNameExpressions.includes(fileInfo.name)) {
            throw new Error(FILE_ERRORS.ILLEGAL_EXPRESSION);
        }

        this.notAllowedFileExtensions.forEach(extension => {
            if (fileInfo.name.endsWith(extension)) {
                throw new Error(FILE_ERRORS.ILLEGAL_EXTENSION);
            }
        })

        if (fileInfo.name.length > this.fileNameSizeLimit) {
            throw new Error(FILE_ERRORS.NAME_TOO_BIG);
        }

        this.fileName = fileInfo.name;
        this.fileSize = size;
    }
}