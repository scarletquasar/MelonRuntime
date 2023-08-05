import { Result } from "../functional/Result";

function trySerialize<T>(target: T) {
    try {
        const value = JSON.stringify(target);
        const result = Result.right(value);
        return result as Result<Error, string>;
    }
    catch(e) {
        return Result.left(e) as Result<Error, string>;
    }
}

export { trySerialize }