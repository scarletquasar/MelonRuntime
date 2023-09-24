import { interopCache } from "logic/runtime/interop-cache-core"
import { UUID } from "types/internal/generic-types";

function newUuid(type: "v4" = "v4"): UUID {
    switch(type) {
        case "v4":
            return interopCache.guid.newGuid();
    }
}

export { newUuid }