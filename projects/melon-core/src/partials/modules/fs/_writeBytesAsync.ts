import { _writeBytes } from "./_writeBytes"

async function _writeBytesAsync(path: string, bytes: number[]) {
    const result = _writeBytes(path, bytes);
}

export { _writeBytesAsync }