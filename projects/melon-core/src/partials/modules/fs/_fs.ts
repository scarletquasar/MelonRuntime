import { _copyFile } from "./_copyFile";
import { _copyFileAsync } from "./_copyFileAsync";
import { _createDirectory } from "./_createDirectory";
import { _createDirectoryAsync } from "./_createDirectoryAsync";
import { _deleteDirectory } from "./_deleteDirectory";
import { _deleteDirectoryAsync } from "./_deleteDirectoryAsync";
import { _deleteFile } from "./_deleteFile";
import { _deleteFileAsync } from "./_deleteFileAsync";
import { _moveFile } from "./_moveFile";
import { _moveFileAsync } from "./_moveFileAsync";
import { _readBytes } from "./_readBytes";
import { _readBytesAsync } from "./_readBytesAsync";
import { _readText } from "./_readText";
import { _readTextAsync } from "./_readTextAsync";
import { _renameFile } from "./_renameFile";
import { _renameFileAsync } from "./_renameFileAsync";
import { _writeBytes } from "./_writeBytes";
import { _writeBytesAsync } from "./_writeBytesAsync";
import { _writeText } from "./_writeText";
import { _writeTextAsync } from "./_writeTextAsync";

const _fs = {
    readText: _readText,
    writeText: _writeText,
    readBytes: _readBytes,
    writeBytes: _writeBytes,
    readTextAsync: _readTextAsync,
    writeTextAsync: _writeTextAsync,
    readBytesAsync: _readBytesAsync,
    writeBytesAsync: _writeBytesAsync,
    deleteFile: _deleteFile,
    deleteFileAsync: _deleteFileAsync,
    moveFile: _moveFile,
    moveFileAsync: _moveFileAsync,
    copyFile: _copyFile,
    renameFile: _renameFile,
    renameFileAsync: _renameFileAsync,
    copyFileAsync: _copyFileAsync,
    createDirectory: _createDirectory,
    createDirectoryAsync: _createDirectoryAsync,
    deleteDirectory: _deleteDirectory,
    deleteDirectoryAsync: _deleteDirectoryAsync
}

export { _fs }