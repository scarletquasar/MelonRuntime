const { http } = Melon;
const app = http.app();

app.get("/", () => "Hello world!");

app.run();