import { _internalConsts } from "../internalConsts/_internalConsts";
import { _getLoadedAssemblies } from "./_getLoadedAssemblies";
import { getStaticMethod } from "./getStaticMethod";
import { getStaticProperty } from "./getStaticProperty";
import { _loadAssembly } from "./_loadAssembly";
import { _Realm } from "./_Realm";
import { _removeAssembly } from "./_removeAssembly";
import { _types } from "./_types";
import { _loadAssemblyAsync } from "./_loadAssemblyAsync";
import { _createTask } from "./threading/_createTask";
import { createThread } from "./threading/createThread";
import { _Task } from "./threading/_Task";
import { Thread } from "./threading/_Thread";
import { _getFactories } from "./_getFactories";
import { _createList } from "./_createList";

const _dotnet = {
    getFactories: _getFactories,
    getStaticMethod,
    getStaticProperty,
    loadAssembly: _loadAssembly,
    removeAssembly: _removeAssembly,
    getLoadedAssemblies: _getLoadedAssemblies,
    loadAssemblyAsync: _loadAssemblyAsync,
    threading: {
        createTask: _createTask,
        createThread,
        Task: _Task,
        Thread
    },
    createList: _createList,
    types: _types,
    Realm: _Realm
}

export { _dotnet }