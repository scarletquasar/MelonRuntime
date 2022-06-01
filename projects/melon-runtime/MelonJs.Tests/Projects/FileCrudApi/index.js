debug.enableStackTracing(true)

const options = {
    loadFunctionLiteral: true
}

const getEntriesRoute = load(__basedir + "/routes/getEntriesRoute.js", options)
const writeEntryRoute = load(__basedir + "/routes/writeEntryRoute.js", options)
const deleteEntryRoute = load(__basedir + "/routes/deleteEntryRoute.js", options)

const app = http.app()

//Query arguments: entryName
app.get("/getEntries", getEntriesRoute)

//Body arguments: entryName, entryContent
app.post("/writeEntry", writeEntryRoute)

//Query arguments: entryName
app.delete("/deleteEntry", deleteEntryRoute)

app.run()