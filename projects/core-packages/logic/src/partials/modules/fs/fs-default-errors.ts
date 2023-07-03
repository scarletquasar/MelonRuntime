class WriteFileError extends Error {
    path: string;

    constructor(path: string, cause: Error) {
        super();
        this.cause = cause;
        this.path = path;
        this.message = "An error has occurred while trying to write to a file";
    }
}

class ReadFileError extends Error {
    path: string;

    constructor(path: string, cause: Error) {
        super();
        this.cause = cause;
        this.path = path;
        this.message = "An error has occurred while trying to read a file";
    } 
}

class TransactFileError extends Error {
    origin: string;
    end: string;

    constructor(origin: string, end: string, cause: Error) {
        super();
        this.cause = cause;
        this.origin = origin;
        this.end = end;
        this.message = "An error has occurred during that file transaction";
    } 
}

class TransactDirectoryError extends Error {
    path: string;

    constructor(path: string, cause: Error) {
        super();
        this.cause = cause;
        this.path = path;
        this.message = "An error has occurred during that directory transaction";
    }
}

export { WriteFileError, ReadFileError, TransactFileError, TransactDirectoryError }