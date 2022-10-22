import { _getStaticMethod } from "./_getStaticMethod";

function _getFactories(namespace: string) {
    const types: any[] = _$internalBinding["GetTypes"](namespace);
    const activator = _getStaticMethod("System:Activator:CreateInstance");
    const constructors: Record<string, any> = {};

    types.forEach(type => {
        const name = type.name.charAt(0).toLowerCase() + type.name.slice(1);

        constructors[name] = (...args: any) => {
            return activator(type, ...args);
        }
    });
    
    return constructors;
}

export { _getFactories }