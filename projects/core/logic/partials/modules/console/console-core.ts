import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "../std/functional/Result";

const serializeAndFix = (target: object) => {
    return interopCache.serialization
        .serialize(target)        
        .replaceAll("\\n", "\n")
        .replaceAll("\\r", "\r");
}

function toLoggableOutput(value: any) {
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
function log(): Result<Error, number> {
    try {
        switch(arguments.length) {
            case 0:
                return Result.right(0);
    
            case 1:
                interopCache.console.writeLine(toLoggableOutput(arguments[0]));
                return Result.right(1);
    
            default:
                let base = 0;
    
                for(base; base < arguments.length; base++) {
                    interopCache.console.writeLine(toLoggableOutput(arguments[base]));
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

function error() {
    
}