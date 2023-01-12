import { getStaticMethod } from "../../dotnet/getStaticMethod";

const _argv = getStaticMethod<string[]>("System:Environment:GetCommandLineArgs")();

export { _argv }