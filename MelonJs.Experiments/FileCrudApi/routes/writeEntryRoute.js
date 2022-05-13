function writeEntryRoute(body) {
    const bodyItems = JSON.parse(body);

    const entriesIndex = JSON.parse(fs.read(__basedir + "/files.json"));
    entriesIndex[bodyItems.entryName] = bodyItems.entryContent;

    fs.write(__basedir + "/files.json", JSON.stringify(entriesIndex));

    const response = {
        response: `Entry ${bodyItems.entryName} with content ${bodyItems.entryContent} created or updated.`
    }

    return JSON.stringify(response);
}