# 🍈 MelonJS
MelonJS is a .NET based dynamic JavaScript runtime made in C# and based in [Jint](https://github.com/sebastienros/jint) and [CLI.NET](https://github.com/EternalQuasar0206/Cli.NET). Currently in development.

- Check the [documentation](https://github.com/MelonRuntime/MelonJS.Docs).

<img src="https://user-images.githubusercontent.com/70824102/167758200-e983576a-7eb8-4c99-b77e-649660abdd13.png" alt="drawing" width="500"/>

## Todo List

⛔ To Do
✅ Done
⚠️ In Progress

| Name | Description | Status | Related PR's/Repos |
| ---- | ----------- | ------ | ------- |
| Implement data query builder + `Enumerable` constructor + `DataQuery` constructor | | ⛔ | |
| Create official multiplatform installer | | ⛔ | |
| TypeScript JIT runtime transpiling | | ⛔ | |
| Implement `performance` module | | ⛔ | |
| Implement `timer` module | | ⛔ | |
| Implement `r*(target)` function | | ✅ | [PR14](https://github.com/MelonRuntime/MelonJS/pull/14) |
| Write a better `fs` module to deal with files properly | | ✅ | [PR14](https://github.com/MelonRuntime/MelonJS/pull/14) |
| Implement dynamic status code rest calls support | | ✅ | [PR11](https://github.com/MelonRuntime/MelonJS/pull/11) |
| Headers support to `HttpApplication` routes | | ✅ | [PR9](https://github.com/MelonRuntime/MelonJS/pull/9) |
| Body support to `HttpApplication` routes | | ✅ | [PR9](https://github.com/MelonRuntime/MelonJS/pull/9) |
| Query support to `HttpApplication` routes | | ✅ | [PR9](https://github.com/MelonRuntime/MelonJS/pull/9) |
| Fix `http.listen` to add new and not overwrite the current HttpApplication port | | ✅ | [PR8](https://github.com/MelonRuntime/MelonJS/pull/8) |
| Add support (with data passing) to `DELETE`, `POST` and `GET` requests | | ✅ | [PR8](https://github.com/MelonRuntime/MelonJS/pull/8) |
| Implement `shift` switch case [alternative](https://gist.github.com/EternalQuasar0206/9245eb9b6dd5e123e4c04604ccd4f630) | | ✅ | [PR7](https://github.com/MelonRuntime/MelonJS/pull/7) |
| Project structure reader with `app.json` | | ✅ | [PR7](https://github.com/MelonRuntime/MelonJS/pull/7) |
| Basic documentation | | ✅ | [MelonJs.Docs](https://github.com/MelonRuntime/MelonJS.Docs) |
| `HttpApplication` constructor | Constructor to make a new web application hosted in the local server with the method `get` and `http.app` | ✅ | [PR6](https://github.com/EternalQuasar0206/MelonJS/pull/6) |
| `http` built in module | Http built in module that aggregates functions like `request` and `ping` | ✅ | [PR1](https://github.com/EternalQuasar0206/MelonJS/pull/1), [PR2](https://github.com/EternalQuasar0206/MelonJS/pull/2), [PR3](https://github.com/EternalQuasar0206/MelonJS/pull/3) |
| Stack traces | Implement stack tracing information into internal error handling | ✅ | [PR5](https://github.com/EternalQuasar0206/MelonJS/pull/5) |
| Internal error handling | The capacity to deal internally with runtime (JavaScript/TypeScript) errors and provide an output | ✅ | [PR4](https://github.com/EternalQuasar0206/MelonJS/pull/4) |
