import { Result } from "../functional/Result";

function tryDeserialize<T>(json: string) {
    try {
        const value = JSON.parse(json);
        const result = Result.right(value);
        return result as Result<Error, T>;
    }
    catch(e) {
        return Result.left(e) as Result<Error, T>;
    }
}

export { tryDeserialize }