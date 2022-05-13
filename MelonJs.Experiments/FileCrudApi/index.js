load(__basedir + "/routes/getEntriesRoute.js")
load(__basedir + "/routes/writeEntryRoute.js")
load(__basedir + "/routes/deleteEntryRoute.js")

const app = http.app()

//Query arguments: entryName
app.get("/getEntries", "getEntriesRoute")

//Body arguments: entryName, entryContent
app.post("/writeEntry", "writeEntryRoute")

//Query arguments entryName
app.delete("/deleteEntry", "deleteEntryRoute")

app.run()