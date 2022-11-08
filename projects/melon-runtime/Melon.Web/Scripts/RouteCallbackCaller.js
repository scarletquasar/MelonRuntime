(function (
    identifier,
    method,
    route,
    query,
    body,
    headers,
    routeValues
) {
    const { _apps: apps } = Melon.http;
    const { tryParse } = Melon.std.json;
    const webapp = apps[identifier];

    const targetEndpoint = webapp
        .getEndpoints()
        .find(x => x.method === method && x.route === route);

    const request = {
        query: tryParse(query),
        body: tryParse(body),
        headers: tryParse(headers),
        values: tryParse(routeValues)
    }

    const result = () => targetEndpoint.callback(request);

    const uuid = "pending_melon_http_promise_" + crypto.randomUUID();
    webapp._promises[uuid] = result;
    return uuid;
})(
    '{appIdentifier}',
    '{method}',
    '{route}',
    '{serializedQuery}',
    '{serializedBody}',
    '{serializedHeaders}',
    '{serializedRouteValues}'
)