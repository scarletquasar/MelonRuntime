type HttpRequest = {
    query: Record<string, any>,
    body: any,
    headers: Record<string, any>
}

export { HttpRequest }