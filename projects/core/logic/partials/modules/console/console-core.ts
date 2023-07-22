import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "../std/functional/Result";
import { TableLike } from "types/internal/generic-types";

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

// The "number" in result means the quantity of printed lines
function error(): Result<Error, number> {
    try {
        switch(arguments.length) {
            case 0:
                return Result.right(0);
    
            case 1:
                interopCache.clinet.writeLine(toLoggableOutput(arguments[0]), "Red");
                return Result.right(1);
    
            default:
                let base = 0;
    
                for(base; base < arguments.length; base++) {
                    interopCache.clinet.writeLine(toLoggableOutput(arguments[base]), "Red");
                }
    
                return Result.right(base);
        }
    }
    catch (e) {
        return Result.left(e);
    }
}

// The "number" in result means the quantity of printed lines
function warn(): Result<Error, number> {
    try {
        switch(arguments.length) {
            case 0:
                return Result.right(0);
    
            case 1:
                interopCache.clinet.writeLine(toLoggableOutput(arguments[0]), "Yellow");
                return Result.right(1);
    
            default:
                let base = 0;
    
                for(base; base < arguments.length; base++) {
                    interopCache.clinet.writeLine(toLoggableOutput(arguments[base]), "Yellow");
                }
    
                return Result.right(base);
        }
    }
    catch (e) {
        return Result.left(e);
    }
}

function table(data: TableLike): Result<Error, []> {
    if (data == null) {
        const error = new Error("Null objects are not allowed");
        return Result.left(error);
    }

    let table = "";

    if (Array.isArray(data)) {
        if (data.length === 0) {
            interopCache.console.writeLine("");
            return Result.right([]);
        }

        if (typeof data[0] === "object") {
            const headers = Object.keys(data[0]);
            table += "| " + headers.join(" | ") + " |\n";
            table += "| " + "-".repeat(headers.length * 3 - 1) + " |\n";

            data.forEach((item) => {
                const row = Object.values(item).map((value) => String(value));
                table += "| " + row.join(" | ") + " |\n";
            });
        } 
        else {
            table += "| Valor |\n";
            table += "| " + "-".repeat(7) + " |\n";

            data.forEach((value) => {
                table += `| ${String(value).padEnd(5)} |\n`;
            });
        }
    } 
    else if (typeof data === "object" && data !== null) {
        const keys = Object.keys(data);
        if (keys.length === 0) {
            interopCache.console.writeLine("");
            return Result.right([]);
        }

        const values = Object.values(data).map((value) => String(value));
        const maxKeyLength = keys.reduce((max, key) => Math.max(max, key.length), 0);
        const maxValueLength = values.reduce((max, value) => Math.max(max, value.length), 0);

        table += "+ " + "-".repeat(maxKeyLength) + " + " + "-".repeat(maxValueLength) + " +\n";

        keys.forEach((key, index) => {
            const value = values[index];
            table += `| ${key.padEnd(maxKeyLength)} | ${value.padEnd(maxValueLength)} |\n`;
        });

        table += "+ " + "-".repeat(maxKeyLength) + " + " + "-".repeat(maxValueLength) + " +\n";
    } else {
        const error = new Error("Not tableable values are not allowed");
        return Result.left(error);
    }

    interopCache.console.writeLine(table);
    return Result.right([]);
}

class ConsoleTimer {
    private started: Date;
    private lastStep: Date;
    private stopped: boolean;

    private checkIfDateIsValid(date: Date): boolean {
        if (Object.prototype.toString.call(date) === "[object Date]") {
            if (isNaN(date.valueOf())) {
                return false;
            } 
            return true;
        }
        return false;
    }

    getEllapsedTime(): Result<Error, Date> {
        if (this.stopped) {
            return Result.left(new Error("The timer was stopped"));
        }

        this.lastStep = new Date(Date.now());

        if (this.checkIfDateIsValid(this.started)) {
            return Result.right(new Date(this.started.valueOf() - this.lastStep.valueOf()));
        }

        return Result.left(new Error("Invalid start date"));
    }

    stop() {
        const final = this.getEllapsedTime();
        this.stopped = true;
        return final;
    }
}

