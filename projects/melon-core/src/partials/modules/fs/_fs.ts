import { _readBytes } from "./_readBytes";
import { _readText } from "./_readText";
import { _writeBytes } from "./_writeBytes";
import { _writeText } from "./_writeText";

const _fs = {
    readText: _readText,
    writeText: _writeText,
    readBytes: _readBytes,
    writeBytes: _writeBytes
}

export { _fs }