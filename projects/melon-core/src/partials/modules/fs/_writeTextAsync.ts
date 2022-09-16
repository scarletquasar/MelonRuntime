import { _writeText } from "./_writeText"

async function _writeTextAsync(path: string, content: string) {
    _writeText(path, content);
}

export { _writeTextAsync }