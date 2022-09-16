import { _internalConsts } from "../internalConsts/_internalConsts";
import { _getLoadedAssemblies } from "./_getLoadedAssemblies";
import { _getStaticMethod } from "./_getStaticMethod";
import { _getStaticProperty } from "./_getStaticProperty";
import { _loadAssembly } from "./_loadAssembly";
import { _Realm } from "./constructors/_Realm";
import { _removeAssembly } from "./_removeAssembly";
import { _types } from "./_types";
import { _loadAssemblyAsync } from "./_loadAssemblyAsync";

const _dotnet = {
    getStaticMethod: _getStaticMethod,
    getStaticProperty: _getStaticProperty,
    loadAssembly: _loadAssembly,
    removeAssembly: _removeAssembly,
    getLoadedAssemblies: _getLoadedAssemblies,
    loadAsemblyAsync: _loadAssemblyAsync,
    types: _types,
    Realm: _Realm
}

export { _dotnet }