import { getStaticMethod } from "../../dotnet/dotnet-interop-core";

const _argv = getStaticMethod<string[]>("System:Environment:GetCommandLineArgs")();

export { _argv }