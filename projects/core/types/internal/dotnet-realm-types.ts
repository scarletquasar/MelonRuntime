import { DotnetInstanceExpression } from "./dotnet-interop-types";
import { Result } from "./functional-types";
import { OutputFriendly, Primitive } from "./generic-types";

interface RealmConstructor {
    new (name?: string): Realm;
}

interface Realm extends OutputFriendly {
    name: string;
    locked: boolean;

    toLoggableOutput(): Primitive | Record<string, Primitive>;
    get<TResult>(name: string): TResult;
    delete(name: string): Promise<Result<Error, boolean>>;
    close(milissecondsDelay?: number): Promise<void>;
    setValue(name: string, value: string): Promise<Result<Error, boolean>>;
    setInstance(
      name: string,
      expression: DotnetInstanceExpression,
      ...parameters: any[]
    ): Promise<Result<Error, boolean>>;
}

export { RealmConstructor, Realm }