import { _getStaticMethod } from "../dotnet/_getStaticMethod";

const _clear = (): void => _getStaticMethod<void>("System:Console:Clear")();

export { _clear }