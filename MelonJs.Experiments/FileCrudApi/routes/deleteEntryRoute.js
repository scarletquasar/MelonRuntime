function deleteEntryRoute(query) {
    const entriesIndex = JSON.parse(fs.read(__basedir + "/files.json"));

    const queryEntryName = JSON.parse(query).entryName;
    const newEntriesIndex = {};

    Object.keys(entriesIndex).forEach(name => {
        name != queryEntryName ? newEntriesIndex[name] = entriesIndex[name] : {}
    });
    
    fs.write(__basedir + "/files.json", JSON.stringify(newEntriesIndex));

    const response = {
        response: `Entry ${queryEntryName} deleted (if existed).`
    }

    return JSON.stringify(response);
}