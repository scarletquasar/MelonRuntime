const loadOptions = {
    useUnsafeInjectorLoader: true,
    useHttpRequest: false
} 

load(__basedir + "/routes/helloWorld.js", loadOptions)

const app = http.app()

app.get("/", "helloWorld")

app.run()