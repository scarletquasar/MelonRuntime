import { getStaticMethod } from "../dotnet/dotnet-interop-core";

const _clear = (): void => {
    getStaticMethod("System:Console:Clear")();
};

export { _clear }