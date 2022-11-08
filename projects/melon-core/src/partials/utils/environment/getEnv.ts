import { _guards } from "../../modules/guards/_guards";
import { _readText } from "../../modules/fs/_readText";
import { _getStaticMethod } from "../../modules/dotnet/_getStaticMethod";
import { _setEnvironmentVariable } from "../../modules/std/environment/_setEnvironmentVariable";
import { envParse } from "./envParse";

const { isNullOrWhiteSpace } = _guards.string;

function getEnv() {
    const content = _readText("./.env");

    if(!isNullOrWhiteSpace(content)) {
        const envObject = envParse(content) as Record<string, any>;
    
        Object
            .entries(envObject)
            .forEach(item => _setEnvironmentVariable(item[0], item[1]));
    }
}

export { getEnv }