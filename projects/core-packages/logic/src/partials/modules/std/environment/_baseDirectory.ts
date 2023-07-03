import { getStaticProperty } from "../../dotnet/dotnet-interop-core";

const _baseDirectory = getStaticProperty<string>("System:Environment:CurrentDirectory");

export { _baseDirectory }