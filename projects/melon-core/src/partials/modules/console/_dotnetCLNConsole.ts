import { _dotnet } from "../dotnet/_dotnet";

const _dotnetCLNConsole = (method: string) => 
    _dotnet.getStaticMethod(`Cli.NET.Tools:CLNConsole:${method}`);

export { _dotnetCLNConsole }