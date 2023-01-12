import { getStaticProperty } from "../../dotnet/getStaticProperty";

const _baseDirectory = getStaticProperty<string>("System:Environment:CurrentDirectory");

export { _baseDirectory }