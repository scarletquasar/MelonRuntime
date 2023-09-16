import { 
    getStaticMethod, 
    getStaticProperty, 
    loadAssembly,
} from "./interop-core";
import { Bridge } from "./interop-bridge-core";

const interop = {
    getStaticMethod,
    getStaticProperty,
    loadAssembly,
    Bridge
}

export { interop }