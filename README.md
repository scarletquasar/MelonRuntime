# <img src="https://avatars.githubusercontent.com/u/105192336?s=400&u=4375e36be647d2a64727bbefc2382c2801897b39&v=4" width="26"> Melon [![npm version](https://badgen.net/npm/v/melon-runtime/)](https://www.npmjs.com/package/melon-runtime) [![npm downloads](https://badgen.net/npm/dm/melon-runtime)](https://www.npmjs.com/package/melon-runtime) [![license](https://badgen.net/github/license/MelonRuntime/Melon)](#)

> **Melon** is a fast modern .NET JavaScript runtime focused in rapid prototyping of projects, using minimal dependencies and functional programming.

📚 [Getting Started (documentation)](https://github.com/MelonRuntime/Melon/wiki) - 💬 [Discord Server](https://discord.gg/wDJDT9Yq7C)

## Why Melon?

- Quick develop and prototype scalable solutions without having to worry about dependencies
- Use features directly from [.NET](https://dotnet.microsoft.com/en-us/) directly from JavaScript
- Use a wide range of runtime agnostic [npm](npmjs.com) libraries by default 

## Web development

Melon brings the power of ASP.NET to JavaScript, allowing you to build synchronous or asynchronous dedicated web applications with few lines, using an express-like interface that is easy and simple to use.

<table>
    <thead>
        <tr>
            <th>
                Melon (No dependencies)
            </th>
            <th>
                Node.js (Express)
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> 


```ts
const { http } = Melon;
const app = http.app();

app.get("/", () => "Hello world");
app.run();
```
</td><td>

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));
app.listen(80, () => {});
```
</td></tr></tbody></table>

## .NET Interoperability

Easy .NET interoperability is reachable with Melon **Realm** feature, allowing the developer to use its exclusive features in order to get
a dynamic development environment:

```ts
/* Basic example of retrieving a Task<T> from the internal CLR
   using the Realm feature and wrapping it inside a standard
   JavaScript Promise object, allowing it to be used asynchronously */
   
const { Realm } = Melon.dotnet;

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

const realm = new Realm();
realm.setInstance("httpClient", "System.Net.Http:HttpClient");

const client = realm.get("httpClient");
const task = client.getAsync(API_URL);
const promise = new Promise((resolve) => resolve(task.result));

promise.then(console.log);
```

## Railway-oriented programming

Functional approach to the execution of functions sequentially, focusing on rational program orientation, performance saving and
readability. Joining your results enrue that unrecoverable errors will panic the current thread while you can handle recoverable errors without any difficulty.

<table>
    <thead>
        <tr>
            <th>
                Melon (Result)
            </th>
            <th>
                Node.js (try-catch hell)
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> 


```ts
const { 
    tryDeserialize, 
    trySerialize 
} = Melon.std.json;

const result1 = tryDeserialize<T>(someString);
const result2 = trySerialize(result1);

result1.join();
result2.join();

const data = result2.match<T>(
    _ => {}, 
    value => value
);
console.log(data);
```
</td><td>

```js
const process = require('process');
try {
    const result1 = 
        JSON.parse(someString);

    try {
        const result2 = 
            JSON.stringify(result1);

        console.log(result2);
    }
    catch(e) {
        throw(e);
    }
}
catch {
    process.exit(0);
}
```
</td></tr></tbody></table>
