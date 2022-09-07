import { _readBytes } from "./_readBytes";
import { _readText } from "./_readText";
import { _writeBytes } from "./_writeBytes";
import { _writeText } from "./_writeText";
declare const _fs: {
    readText: typeof _readText;
    writeText: typeof _writeText;
    readBytes: typeof _readBytes;
    writeBytes: typeof _writeBytes;
};
export { _fs };
