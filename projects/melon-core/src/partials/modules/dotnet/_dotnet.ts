import { _types } from "./_types";
import { 
    getFactories, 
    getStaticMethod, 
    getStaticProperty, 
    removeAssembly, 
    getLoadedAssemblies, 
    loadAssemblyAsync, 
    createList, 
    loadAssembly
} from "./dotnet-interop-core";
import { Realm } from "./dotnet-realm-core";
import { createTask, createThread, Task, Thread } from "./dotnet-threading-core";
 

const _dotnet = {
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
    types: _types,
    Realm
}

export { _dotnet }