<img align="left" src="https://i.imgur.com/w2aYNRW.png" width="200">

# The Melon Runtime Project

> *“The computing scientist’s main challenge is not to get confused by the complexities of his own making.” - Edsger Dijkstra*

Melon is a JavaScript runtime based on the .NET environment with multi-threading capabilities. The project is focused on offering a platform that eases project prototyping, having a clean control of asynchronous environments and parallel events and providing fully compatible interoperability with the .NET features and ecosystem.

[Documentation (alpha)](https://melon-docs.vercel.app/docs/intro) - [Discord server](https://discord.gg/wDJDT9Yq7C) - [CityJS conference presentation](https://youtu.be/lD39kjrXRvo?t=18715)

<br>

> **Warning**
>
> Melon is **NOT** production-ready yet, the project is currently being developed and being battle-tested in different environments. Most of the required features, fixes and optimizations are not ready yet. Use in real-world projects at your own risk.

# Features spotlight

> Below, are listed **some** features that **already are** in the project or that **are in construction**

## <img align="left" src="https://i.imgur.com/ZFJPQik.png" width="40"> EventChain

Melon is directly affected by how [.NET tasks](https://learn.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap) works, meaning that the feature can be used to make clean, reusable "event loops" that are smartly selected to perform specific actions, reducing inconsistencies and providing an entirely controlled group of threads that can be used for any purpose. *Melon runs asynchronously by default and all the internal api is designed to profit from tasks.

### 🔎 How this works?

In .NET, there is a feature called *thread pool*, when you try to do an asynchronous task, one thread from that pool is recovered and reused to do the action, then, cleaned and turned ready to use again. With Melon, instead this is extended by the creation of an object called `EventChain()` that is a thread pool containing threads that contains *event loops*, so, the runtime does all the work of cleaning and reusing these *event loops*.

## <img align="left" src="https://i.imgur.com/z0uFDdq.png" width="40"> Integrated Development Toolkit

Melon is *strictly* designed to offer the best and easier **prototyping reliability**, so it contains a lot of features that enables the final developer to create entire applications with minimal (or zero) dependencies and also rewrite parts (or the entire) code easily without having coupled architectures and patterns.

### 🔎 How this works?

Melon comes with a rich, well prepared API that contains the most used (and loved) tools to fit in the modern application development world. For example, th Melon is possible to *easily* create a WebAPI with no dependencies:

```typescript
const { http } = Melon;
const app = http.app();

app.get("/", () => "Hello world");
app.run();
```

## <img align="left" src="https://i.imgur.com/WEa64y7.png" width="40"> .NET Realms

`Realm()` is a feature designed to create and manipulate objects inside the .NET runtime instead of dealing with it inside the JavaScript engine, it allows the developer to create anything in CLR and recover it in the script without losing features or behaviors.

### 🔎 How this works?

Creating a realm and manipulating instances is simple, there are some helper methods created to instance and change objects:

```typescript
const { Realm } = Melon.dotnet;
const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

async function httpGetFromCLR() {
    let realm = new Realm();
    realm.setInstance("httpClient", "System.Net.Http:HttpClient");

    let client = realm.get("httpClient");
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
