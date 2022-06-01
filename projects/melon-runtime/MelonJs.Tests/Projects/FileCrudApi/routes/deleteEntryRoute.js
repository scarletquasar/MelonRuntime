const deleteEntryRoute = (query) => {
    try {
        const entriesIndex = JSON.parse(fs.read(__basedir + "/files.json"));

        const queryEntryName = (JSON.parse(query)).entryName;

        if(!entriesIndex[queryEntryName])
            throw new Error("Entry " + queryEntryName + " does not exist.");

        const newEntriesIndex = {};

        Object.keys(entriesIndex).forEach(name => {
            name != queryEntryName ? newEntriesIndex[name] = entriesIndex[name] : {}
        });
        
        fs.write(__basedir + "/files.json", JSON.stringify(newEntriesIndex));

        return http.result(200, "Entry " + queryEntryName + " deleted.");
    }
    catch(e) {
        return http.result(500, e.toString());
    }
}