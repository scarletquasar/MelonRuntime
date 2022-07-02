const xrequire = (target) => {
    const attributes = target.split(":");

    switch (attributes[0]) {
        case "dotnet":
            return __xrequire_dotnet__(attributes[1]);
    }

}