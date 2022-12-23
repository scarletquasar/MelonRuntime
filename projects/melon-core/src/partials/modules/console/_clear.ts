import { getStaticMethod } from "../dotnet/getStaticMethod";

const _clear = (): void => {
    getStaticMethod("System:Console:Clear")();
};

export { _clear }