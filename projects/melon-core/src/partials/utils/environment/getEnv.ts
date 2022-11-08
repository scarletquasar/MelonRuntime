import { _getStaticMethod } from "../../modules/dotnet/_getStaticMethod";
import { _readText } from "../../modules/fs/_readText";
import { _nextTick } from "../../modules/std/async/_nextTick";
import { _setEnvironmentVariable } from "../../modules/std/environment/_setEnvironmentVariable";
import { envParse } from "./envParse";

const getFiles = _getStaticMethod<string[]>("System.IO:Directory:GetFiles");

function getEnv() {
    const file = getFiles("./", "*.env")[0];
    const content = _readText(file);
    const envObject = envParse<Record<string, any>>(content);

    Object.entries(envObject).forEach(item => _setEnvironmentVariable(item[0], item[1]));
}

export { getEnv }