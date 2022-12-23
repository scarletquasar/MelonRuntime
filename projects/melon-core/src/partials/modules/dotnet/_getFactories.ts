import { getStaticMethod } from "./getStaticMethod";

function _getFactories(namespace: string) {
    const types: any[] = _$internalBinding["GetTypes"](namespace);
    const activator = getStaticMethod("System:Activator:CreateInstance");
    const constructors: Record<string, { new: (...args: any) => any }> = {};

    types.forEach(type => {
        const name = type.name[0].toLowerCase() + type.name.slice(1);

        constructors[name] = {
            new: (...args: any) => {
                return activator(type, ...args);
            }
        }
    });
    
    return constructors;
}

export { _getFactories }