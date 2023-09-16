import { interopCache } from "logic/runtime/interop-cache-core"

function newUuid(type: "v4" = "v4") {
    switch(type) {
        case "v4":
            return interopCache.guid.newGuid();
    }
}

export { newUuid }