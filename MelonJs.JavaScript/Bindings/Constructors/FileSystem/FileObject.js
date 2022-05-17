class FileObject {
    static test = 1;

    //Path
    path = null;

    //File Information
    fileName = null;
    fileSize = null;
    lastWriteTime = null;
    creationTime = null;

    //Object Limits
    fileSizeLimit = 10000; //Measured in kb
    fileNameSizeLimit = 64; //Measured in characters
    notAllowedFileNameExpressions = [];
    notAllowedFileExtensions = [];

    //File Content
    bytes = [];

    constructor(fileInfo) {
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