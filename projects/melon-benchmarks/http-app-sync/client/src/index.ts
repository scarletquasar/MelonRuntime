const { requestAsync } = Melon.http;

async function callServer() {
    let limit = 50000;

    console.time("http-app-sync benchmark | 50.000 requests");

    while(limit > 0) {
        const result = await requestAsync("http://localhost:80");
        console.log(result.body);

        limit--;
    }

    console.timeEnd("http-app-sync benchmark | 50.000 requests");
}

callServer();