import { DotnetInstanceExpression } from "../../../../types/dotnet/DotnetInstanceExpression";
import { InteropResult } from "../../../../types/dotnet/InteropResult";
import { Realm } from "../../../../types/dotnet/Realm";
import { _Crypto } from "../../../statics/_Crypto";

class _Realm implements Realm {
    name: string;
    setValue: (name: string, value: string) => void;
    setInstance: (name: string, expression: DotnetInstanceExpression, ...parameters: any) => void;
    get: (name: string) => InteropResult;

    constructor(name?: string) {
        _$internalBinding["CreateRealm"](name ?? _Crypto.randomUUID());

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

        this.get = (name) => 
            _$internalBinding["GetRealmProperty"](this.name, name);
    }
}

export { _Realm }