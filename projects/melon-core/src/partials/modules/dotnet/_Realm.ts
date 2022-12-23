import { DotnetInstanceExpression } from "../../../types/dotnet/DotnetInstanceExpression";
import { Realm } from "../../../types/dotnet/Realm";
import { _crypto } from "../../statics/_crypto";

class _Realm implements Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: <TResult>(name: string) => TResult;
    delete: (name: string) => void;
    close: (delay: number) => void;

    constructor(name?: string) {
        if(!name) {
            name = _crypto.randomUUID();
        }

        _$internalBinding["CreateRealm"](name);

        this.name = name;

        this.setValue = (name, value) => 
            _$internalBinding["SetRealmScriptProperty"](this.name, name, value);

        this.setInstance = (name, expression, ...parameters) => {
            const parts = expression.split(":");
            const namespace = parts[0];
            const type = parts[1];

            _$internalBinding["SetRealmInstanceProperty"](
                this.name, 
                name, 
                namespace,
                type, 
                Array.from(parameters)
            );
        }

        this.get = (name) => _$internalBinding["GetRealmProperty"](this.name, name);
        this.delete = (name) => _$internalBinding["DeleteRealmProperty"](this.name, name);
        this.close = (delay = 0) => _$internalBinding["DeleteRealm"](this.name, delay);
    }
}

export { _Realm }