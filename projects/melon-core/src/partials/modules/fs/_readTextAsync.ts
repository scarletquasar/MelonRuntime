import { _readText } from "./_readText";

async function _readTextAsync(path: string): Promise<string> {
    const result = _readText(path);
    return result;
}

export { _readTextAsync }