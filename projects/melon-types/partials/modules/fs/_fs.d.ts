import { _readBytes } from "./_readBytes";
import { _readBytesAsync } from "./_readBytesAsync";
import { _readText } from "./_readText";
import { _readTextAsync } from "./_readTextAsync";
import { _writeBytes } from "./_writeBytes";
import { _writeBytesAsync } from "./_writeBytesAsync";
import { _writeText } from "./_writeText";
import { _writeTextAsync } from "./_writeTextAsync";
declare const _fs: {
    readText: typeof _readText;
    writeText: typeof _writeText;
    readBytes: typeof _readBytes;
    writeBytes: typeof _writeBytes;
    readTextAsync: typeof _readTextAsync;
    writeTextAsync: typeof _writeTextAsync;
    readBytesAsync: typeof _readBytesAsync;
    writeBytesAsync: typeof _writeBytesAsync;
};
export { _fs };
