import { clear, write, read } from "logic/api/modules/stdio/stdio-console-core";
import { storage } from "./stdio-storage-core";

const stdio = {
    storage,
    console: {
        write,
        clear,
        read
    }
}

export { stdio }