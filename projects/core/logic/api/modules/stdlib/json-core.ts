import { Result } from "./functional-core";

function deserialize<T>(json: string): Result<Error, T> {
    try {
        const value = JSON.parse(json);
        return Result.right(value);
    }
    catch(e) {
        return Result.left(e);
    }
}

function serialize<T>(target: T): Result<Error, string> {
    try {
        const value = JSON.stringify(target);
        return Result.right(value);
    }
    catch(e) {
        return Result.left(e);
    }
}

export { deserialize, serialize }