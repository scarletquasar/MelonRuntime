import { _dotnet } from "../dotnet/_dotnet";

const _dotnetConsole = (method: string) => 
    _dotnet.getStaticMethod(`System:Console:${method}`);

export { _dotnetConsole }