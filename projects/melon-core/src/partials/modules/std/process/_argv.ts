import { _dotnet } from "../../dotnet/_dotnet";

const _argv = _dotnet.getStaticMethod<string[]>("System:Environment:GetCommandLineArgs")();

export { _argv }