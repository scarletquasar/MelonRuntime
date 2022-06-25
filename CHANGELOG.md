## Changelog

For complete information about all releases, such as release candidates, pull requests and more details, visit the [official release list](https://github.com/MelonRuntime/MelonRuntime/releases).

### [v1.5.0](https://github.com/MelonRuntime/MelonRuntime/releases/tag/v1.5.0)
`06/24/2022`

> The Docker + RestAPI Update

- `http.app` and `HttpApplication` codebase and types remade to accept callback functions instead of string unsafe scripts. Now, http applications will be internally identified with a `name` field, store the callback externally (instead of sending it to the C# core) and that callback will be called using the `name` reference, from the core, with a `_apps` wrapper inside the `http` module
- Developed integrated Dockerfile and implemented [path resolution/memory usage] fixes to enable Docker support in MelonRuntime projects. Currently, the available compatible pre-built Dockerfiles can be found in the [dedicated folder](https://github.com/MelonRuntime/MelonRuntime/tree/main/utils/dockerfiles/) (you can also create your custom ones)
