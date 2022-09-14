import { _dotnet } from "../../dotnet/_dotnet";

const _baseDirectory = _dotnet.getStaticProperty<string>("System:Environment:CurrentDirectory");

export { _baseDirectory }