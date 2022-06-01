const load = (path, options = { useHttpRequest: false, useUnsafeInjectorLoader: false }) => {
    const content = options.useHttpRequest ? http.request(path) : fs.read(path);

    if (options.useUnsafeInjectorLoader)
        return getUnsafeInjectorLoaderResponse(content);

    const parsed = esprima.parse(content).body;

    const result = {}

    parsed.forEach(item => {
        let content = escodegen.generate(item)

        content = content.replaceAll("=>", "{funcArrow}")
        content = content.split("=")

        if (content.length > 1) {
            content = content.slice(1).join("")
        }
        else {
            content = content.join("")
        }

        content = content.replaceAll("{funcArrow}", "=>").replaceAll(";", "")

        let parsedContent;

        console.log(item.type)
        console.log(content)

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
                parsedContent = eval(content)
            }

            result[item.declarations[0].id.name] = parsedContent
        }
        else {
            result[item.id.name] = parsedContent
        }
    })

    return result;
}