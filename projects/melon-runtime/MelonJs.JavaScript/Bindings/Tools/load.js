const load = (path, options = { loadFunctionLiteral: false, useHttpRequest: false, useUnsafeInjectorLoader: false }) => {
    const content = options.useHttpRequest ? http.request(path) : fs.read(path)

    if (options.useUnsafeInjectorLoader)
        return getUnsafeInjectorLoaderResponse(content)

    const parsed = esprima.parse(content).body

    let result = {}

    parsed.forEach(item => {
        let content = escodegen.generate(item)

        content = content.replaceAll("=>", "{funcArrow}")

        if (content.length > 1) {
            content = content.split("=").slice(1).join("=")
        }
        else {
            content = content.join("")
        }

        content = content.replaceAll("{funcArrow}", "=>")

        let parsedContent

        if (item.type === "FunctionDeclaration") {
            parsedContent = content
        }

        if (item.declarations) {
            //Parse objects
            try {
                parsedContent = JSON.parse(content)
            }
            //Eval other items
            catch {
                parsedContent = options.loadFunctionLiteral ? content : eval(content)
            }

            result[item.declarations[0].id.name] = parsedContent
        }
        else {
            result[item.id.name] = parsedContent
        }
    })

    if (Object.keys(result).length === 1) {
        result = result[Object.keys(result)[0]]
    }

    return result
}