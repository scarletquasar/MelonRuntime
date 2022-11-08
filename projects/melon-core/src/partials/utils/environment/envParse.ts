function envParse<T>(content: string) {
    const entries = content
        .split("\n")
        .map(line => line.trim())
        .filter(line => !line.startsWith("#"))
        .map(line => line.split("="))
        .filter(entry => entry.length === 2)
        .filter(entry => Boolean(entry[0]) && Boolean(entry[1]));

    return Object.fromEntries(entries) as T;
}

export { envParse }