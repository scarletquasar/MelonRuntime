import { Result } from "./functional-core";

function deserialize<T>(json: string) {
    try {
        const value = JSON.parse(json);
        const result = Result.right(value);
        return result as T;
    }
    catch(e) {
        return Result.left(e);
    }
}

function serialize<T>(target: T) {
    try {
        const value = JSON.stringify(target);
        const result = Result.right(value);
        return result as Result<Error, string>;
    }
    catch(e) {
        return Result.left(e) as Result<Error, string>;
    }
}

export { deserialize, serialize }