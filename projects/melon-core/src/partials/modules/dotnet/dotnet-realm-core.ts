import { DotnetInstanceExpression } from "../../../types/dotnet/DotnetInstanceExpression";
import { OutputFriendly, Primitive } from "../../../types/generic-types";
import { _crypto } from "../../statics/_Crypto";
import { Result } from "../std/functional/Result";

class Realm implements OutputFriendly {
    name: string;
    locked: boolean;

    private itemNames: string[];

    constructor(name?: string) {
        name ??= _crypto.randomUUID();
        _$internalBinding["CreateRealm"](name);
    }

    toLoggableOutput(): Primitive | Record<string, Primitive> {
        return {
            name: this.name,
            locked: this.locked,
            items: this.itemNames
        }
    }

    get<TResult>(name: string) {
        return _$internalBinding["GetRealmProperty"](this.name, name) as TResult;
    }

    async delete(name: string): Promise<Result<Error, boolean>> {
        if (this.locked) {
            const error = new Error("Can not interact with the realm while it is locked.");
            return Result.left(error) as Result<Error, boolean>;
        }

        this.locked = true;
        await Promise.resolve(_$internalBinding["DeleteRealmProperty"](this.name, name));
        this.itemNames = this.itemNames.filter(itemName => itemName != name);
        this.locked = false;

        return Result.right(true) as Result<Error, boolean>;
    }

    async close(milissecondsDelay = 0) {
        await Promise.resolve(_$internalBinding["DeleteRealm"](this.name, milissecondsDelay));
    }

    async setValue(name: string, value: string): Promise<Result<Error, boolean>> {
        if (this.locked) {
            const error = new Error("Can not interact with the realm while it is locked.");
            return Result.left(error) as Result<Error, boolean>;
        }

        this.locked = true;
        await Promise.resolve(_$internalBinding["SetRealmScriptProperty"](this.name, name, value));
        this.itemNames.push(name);
        this.locked = false;

        return Result.right(true) as Result<Error, boolean>;
    }

    async setInstance(
        name: string, 
        expression: DotnetInstanceExpression, 
        ...parameters: any
    ): Promise<Result<Error, boolean>> {
        if (this.locked) {
            const error = new Error("Can not interact with the realm while it is locked.");
            return Result.left(error) as Result<Error, boolean>;
        }

        const parts = expression.split(":");
        const namespace = parts[0];
        const type = parts[1];

        this.locked = true;
        await Promise.resolve(_$internalBinding["SetRealmInstanceProperty"](
            this.name, 
            name, 
            namespace,
            type, 
            Array.from(parameters)
        ));
        this.itemNames.push(name);
        this.locked = false;

        return Result.right(true) as Result<Error, boolean>;
    }
}

export { Realm }