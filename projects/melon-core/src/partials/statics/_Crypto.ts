import { _dotnet } from "../modules/dotnet/_dotnet";

const { getStaticMethod } = _dotnet;

class _Crypto {
    static randomUUID() {
        const getNewUUID = getStaticMethod<string>("System:Guid:NewGuid");
        return getNewUUID();
    }
}

export { _Crypto }