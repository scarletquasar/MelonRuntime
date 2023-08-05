import { 
    getFactories, 
    getStaticMethod, 
    getStaticProperty, 
    removeAssembly, 
    getLoadedAssemblies, 
    loadAssemblyAsync, 
    createList, 
    loadAssembly,
    types
} from "./dotnet-interop-core";
import { Realm } from "./dotnet-realm-core";
import { createTask, createThread, Task, Thread } from "./dotnet-threading-core";
 
const dotnet = {
    getFactories,
    getStaticMethod,
    getStaticProperty,
    loadAssembly,
    removeAssembly,
    getLoadedAssemblies,
    loadAssemblyAsync,
    threading: {
        createTask,
        createThread,
        Task,
        Thread
    },
    createList,
    types,
    Realm
}

export { dotnet }