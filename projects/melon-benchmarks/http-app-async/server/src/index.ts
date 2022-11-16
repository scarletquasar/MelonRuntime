const { http } = Melon;
const app = http.app();

app.get("/", async () => "Hello world!");

app.run();