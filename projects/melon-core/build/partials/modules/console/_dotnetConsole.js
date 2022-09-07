import { _dotnet } from "../dotnet/_dotnet";
const _dotnetConsole = (method) => _dotnet.getStaticMethod(`System:Console:${method}`);
export { _dotnetConsole };
