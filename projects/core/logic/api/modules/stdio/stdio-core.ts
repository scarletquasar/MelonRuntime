import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "logic/api/modules/std/functional/Result";

// Important: generally, "stdio" module operations are NOT thread-sade

const serializeAndFix = (target: object) => {
    return interopCache.serialization
        .serialize(target)        
        .replaceAll("\\n", "\n")
        .replaceAll("\\r", "\r");
}

function extractLoggableOutput(value: any) {
    if (value?.toLoggableOutput) {
        return serializeAndFix(value.toLoggableOutput());
    }

    switch(value?.constructor) {
        case Boolean:
        case Number:
        case BigInt:
        case String:
            return value;

        case Symbol:
            return value.toString();

        case Function:
            return "[Function]";

        default:
            break;
    }

    switch(typeof value) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
            return value;

        case "symbol":
            return value.toString();

        case "function":
            return "[Function]"

        default:
            break;
    }

    return serializeAndFix(value);
}

// The "number" in result means the quantity of printed lines
function write(): Result<Error, number> {
    this.des = 1;
    try {
        switch(arguments.length) {
            case 0:
                return Result.right(0);
    
            case 1:
                interopCache.console.write(extractLoggableOutput(arguments[0]));
                return Result.right(1);
    
            default:
                let base = 0;
    
                for(base; base < arguments.length; base++) {
                    interopCache.console.write(extractLoggableOutput(arguments[base]));
                }
    
                return Result.right(base);
        }
    }
    catch (e) {
        return Result.left(e);
    }
}

function clear(): Result<Error, []> {
    try {
        interopCache.console.clear();
        return Result.right([]);
    }
    catch (e) {
        return Result.left(e);
    }
}

function read(): Result<Error, string> {
    try {
        const result = interopCache.console.read();
        return Result.right(result);
    }
    catch (e) {
        return Result.left(e);
    }
}

export { 
    clear,
    write,
    read
}
