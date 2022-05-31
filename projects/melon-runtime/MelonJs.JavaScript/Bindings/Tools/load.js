const load = (path, options = { useHttpRequest: false, useUnsafeInjectorLoader: false }) => {
    const content = options.useHttpRequest ? http.request(path) : fs.read(path);

    if (options.useUnsafeInjectorLoader)
        return getUnsafeInjectorLoaderResponse(content);

    const parsed = esprima.parse(content).body;

    const result = []

    parsed.forEach(item => {
        const obj = {}

        let content = escodegen.generate(item)
        content = content.replaceAll("=>", "{funcArrow}")
        content = content.split("=").slice(1).join("")
        content = content.replaceAll("{funcArrow}", "=>")

        if (item.declarations) {
            obj.name = item.declarations[0].id.name
        }
        else {
            obj.name = item.id.name
        }

        obj.value = eval(content)

        result.push(obj)
    })

    return result;
}