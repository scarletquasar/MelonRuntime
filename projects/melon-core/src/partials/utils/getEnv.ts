import { _getStaticMethod } from "../modules/dotnet/_getStaticMethod";
import { _readText } from "../modules/fs/_readText";
import { _setEnvironmentVariable } from "../modules/std/environment/_setEnvironmentVariable";

function getEnv() {
    const getFiles = _getStaticMethod<string[]>("System.IO:Directory:GetFiles");
    const files = getFiles("./", "*.env");
    let entries = [];

    files.forEach(file => {
        const fileContent = _readText(file).split("\n");
        const noCommentsContent = fileContent.filter(line => !line.trim().startsWith("#"));
        entries = noCommentsContent.map(line => line.split("="));
    })

    entries.forEach(entry => _setEnvironmentVariable(entry[0], entry[1]));
}

export { getEnv }