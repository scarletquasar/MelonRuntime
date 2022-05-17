class File {
    //Path
    path = null;

    //File Information
    fileName = null;
    fileSize = null;
    lastWriteTime = null;
    creationTime = null;

    //Object Limits
    fileSizeLimit = 1000; //Measured in kb
    fileNameSizeLimit = 64; //Measured in characters
    notAllowedFileNameExpressions = [];
    notAllowedFileExtensions = [];

    //File Content
    bytes = new ArrayBuffer();

    constructor(fileName, fileContent) {

    }
}