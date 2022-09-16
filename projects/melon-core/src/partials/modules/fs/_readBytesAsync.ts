import { _readBytes } from "./_readBytes";

async function _readBytesAsync(path: string): Promise<number[]> {
    const result = _readBytes(path);
    return result;
}

export { _readBytesAsync }