const loadOptions = {
    useUnsafeInjectorLoader: true,
    useHttpRequest: false
} 

load(__basedir + "/routes/getEntriesRoute.js", loadOptions)
load(__basedir + "/routes/writeEntryRoute.js", loadOptions)
load(__basedir + "/routes/deleteEntryRoute.js", loadOptions)

const app = http.app()

//Query arguments: entryName
app.get("/getEntries", "getEntriesRoute")

//Body arguments: entryName, entryContent
app.post("/writeEntry", "writeEntryRoute")

//Query arguments: entryName
app.delete("/deleteEntry", "deleteEntryRoute")

app.run()