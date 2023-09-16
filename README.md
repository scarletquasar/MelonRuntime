<div align="center">
    <img align="center" src="https://i.imgur.com/w2aYNRW.png" width="150">
    <h1>The Melon Runtime Project</h1>
</div>

> *“The computing scientist’s main challenge is not to get confused by the complexities of his own making.” - Edsger Dijkstra*

> **Warning**
>
> Melon is **NOT** production-ready yet, the project is currently being developed and being battle-tested in different environments. Most of the required features, fixes and optimizations are not ready yet. Use in real-world projects at your own risk.
> Even this README may not reflect the current published Melon situation yet.
 
Melon is a JavaScript runtime based on the .NET environment with multi-threading capabilities. The project is focused on offering a platform that eases project prototyping, having a clean control of asynchronous environments and parallel events and providing fully compatible interoperability with the .NET features and ecosystem.

<!-- - **[Documentation (alpha)](https://melon-docs.vercel.app/docs/intro)**
- **[Discord server](https://discord.gg/wDJDT9Yq7C)** -->

- **[CityJS conference presentation](https://youtu.be/lD39kjrXRvo?t=18715)**

# Features spotlight

> Below, are listed **some** features that **already are** in the project or that **are in construction**

## Multi-threaded Promises

Melon's internal library is focused in providing a multi-threaded workflow with the efficiency of using Promises. To achieve it, dotnet Task and Thread objects are binded to it allowing the final developer to use multi-threaded capabilities without having to do extra work, use libraries or appeal to archaic features like event-based worker threads.

## Clear API with no mistery

Melon is *strictly* designed to offer the best and easier **prototyping reliability**, so it contains a lot of features that enables the final developer to create entire applications with minimal (or zero) dependencies and also rewrite parts (or the entire) code easily without having coupled architectures and patterns.

```typescript
const { server } = Melon;
const host = server.createHost();

host.get("/", () => "Hello world");
host.run();
```

## Easy interop with .NET

`Realm()` is a feature designed to create and manipulate objects inside the .NET runtime instead of dealing with it inside the JavaScript engine, it allows the developer to create anything in CLR and recover it in the script without losing features or behaviors. Below, there is a quick example on how to create and use the capabilities of a Realm object:

```typescript
const { Bridge } = Melon.interop;
const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

async function httpGetFromCLR() {
    let bridge = new Bridge();
    realm.setInstance("httpClient", "System.Net.Http:HttpClient");

    let client = bridge.get("httpClient");
    let task = client.getAsync(API_URL);
    let promise = new Promise((resolve) => resolve(task.result));

    let result = await promise;
    console.log(result);
}
```

# Compiling from source

### Supported platforms

Melon supports a wide range of platforms that are also supported by [.NET 6](https://github.com/dotnet/core/blob/main/release-notes/6.0/supported-os.md) and [NodeJS](https://github.com/nodejs/node/blob/main/BUILDING.md#supported-platforms).

### Building via command line

Clone the repository using the following command:

```bash
git clone https://github.com/MelonRuntime/Melon.git [path]
cd [path]
```

Then, you will be able to use one of the buid/debug commands:

| Command | Description |
| ------- | ----------- |
| `build:win` | Builds the Melon binaries (Windows) |
| `build:linux` | Builds the Melon binaries (Linux) |
| `dev:win` | Builds the binaries and executes the program using hot reloading (only C#) (Windows) |
| `dev:linux` | Builds the binaries and executes the program using hot reloading (only C#) (Linux) |
| `install-dev:win` | Builds the binaries and installs Melon as a global npm package from the local source (Windows) |
| `install-dev:linux` | Builds the binaries and installs Melon as a global npm package from the local source (Linux) |
| `all-benchmarks` | Executes all Melon debug benchmarks (requires [Hyperfine](https://github.com/sharkdp/hyperfine)) |

### Opening in Visual Studio Community or JetBrains Rider

To open the C# solution `.sln` file and get access to the main runtime code just follow the path:

```
Melon > projects > native > MelonRuntime.sln
```
