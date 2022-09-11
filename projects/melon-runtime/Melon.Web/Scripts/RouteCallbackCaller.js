(function (identifier, method, route, serializedQuery, serializedBody, serializedHeaders) {
    const request = {
        query: Melon.std.json.tryParse(serializedQuery),
        body: Melon.std.json.tryParse(serializedBody),
        headers: Melon.std.json.tryParse(serializedHeaders)
    }

    const callback = Melon.http._apps[identifier]
        .getEndpoints()
        .find(x => x.method === method && x.route === route)
        .callback;

    const result = callback(request);

    if (result instanceof Promise) {
        result.then(x => x);
    }

    return result;
})(
    '{appIdentifier}',
    '{method}',
    '{route}',
    '{serializedQuery}',
    '{serializedBody}',
    '{serializedHeaders}'
)