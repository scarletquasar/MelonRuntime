import { _readBytes } from "./_readBytes";
import { _readBytesAsync } from "./_readBytesAsync";
import { _readText } from "./_readText";
import { _readTextAsync } from "./_readTextAsync";
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
    writeBytesAsync: _writeBytesAsync
}

export { _fs }