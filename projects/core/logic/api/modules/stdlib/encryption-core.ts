import { interopCache } from "logic/runtime/interop-cache-core"
import { UUID } from "types/internal/generic-types";
import { Result } from "./functional-core";

function newUuid(type: "v4" = "v4"): Result<Error, UUID> {
    switch(type) {
        case "v4":
            return Result.right(interopCache.guid.newGuid());
        default:
            return Result.left(new Error("Invalid UUID type"));
    }
}

export { newUuid }