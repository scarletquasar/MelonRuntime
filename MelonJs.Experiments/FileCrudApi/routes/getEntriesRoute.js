function getEntriesRoute(query) {
    const queryItems = JSON.parse(query);
    let entries = JSON.parse(fs.read(__basedir + "/files.json"));

    if(queryItems.fileName) {
        const targetEntry = entryName[queryItems.entryName];

        entries = {};
        entries[queryItems.entryName] = targetEntry;
    }

    return JSON.stringify(entries);
}