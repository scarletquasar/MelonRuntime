let getEntriesRoute = (query) => {
    try {
        const queryItems = JSON.parse(query);
        let entries = JSON.parse(fs.read(__basedir + "/files.json"));

        if(queryItems.fileName) {
            const targetEntry = entryName[queryItems.entryName];

            entries = {};
            entries[queryItems.entryName] = targetEntry;
        }

        return http.result(200, entries);
    }
    catch(e) {
        return http.result(500, e.toString());
    }
}