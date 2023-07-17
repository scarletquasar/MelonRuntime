import { Thread } from "../../dotnet/dotnet-threading-core";
import { Either } from "./Either";

class Result<TError extends Error, TValue> extends Either<TError, TValue> {
    match = this.fold;
    join(message?: string) {
        if(this.leftValue != null) {
            Thread.panic(message ?? this.leftValue.message);
        }
    }
}

export { Result }