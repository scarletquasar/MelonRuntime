function writeEntryRoute(body) {
    try {
        const bodyItems = JSON.parse(body);

        const entriesIndex = JSON.parse(fs.read(__basedir + "/files.json"));
        entriesIndex[bodyItems.entryName] = bodyItems.entryContent;

        fs.write(__basedir + "/files.json", JSON.stringify(entriesIndex));

        return http.result(200, `Entry ${bodyItems.entryName} with content ${bodyItems.entryContent} created or updated.`);
    }
    catch(e) {
        return http.result(500, e.toString());
    }
}