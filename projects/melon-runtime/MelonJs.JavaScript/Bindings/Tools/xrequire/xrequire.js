const xrequire = (target) => {
    const attributes = target.split(":");

    switch (attributes[0]) {
        case "dotnet":
            return __xrequire_dotnet_internal__(attributes[1]);

        case "dotnet-external":
            /* TODO: Check if the target loaded file actually exists */
            return __xrequire_dotnet_external__(attributes[1]);
    }

}