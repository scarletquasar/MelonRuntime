import { Thread } from "../../dotnet/threading/Thread";
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