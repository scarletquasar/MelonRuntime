load(__basedir + "/routes/helloWorld.js")

const app = http.app()

app.get("/", "helloWorld")

app.run()