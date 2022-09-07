import { _dotnet } from "../dotnet/_dotnet";
const _dotnetCLNConsole = (method) => _dotnet.getStaticMethod(`Cli.NET.Tools:CLNConsole:${method}`);
export { _dotnetCLNConsole };
