import { _dotnet } from "../modules/dotnet/_dotnet";

const { getStaticMethod } = _dotnet;

class _Crypto {
    static randomUUID() {
        const getRawUUID = getStaticMethod("System:Guid:NewGuid");
        return getRawUUID().toString();
    }
}

export { _Crypto }