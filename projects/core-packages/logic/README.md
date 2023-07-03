# melon-core

Core of features written in TypeScript that connect to the runtime via bindings. Contains the external logic of all Melon functionality in its entirety.

## How it works?

After type-safe development and reflection of all `melon-core` features into `melon-types`, a bundle is performed and the result is moved to the `melon-runtime` package, where it is used by [Jint](https://github.com/sebastienros/jint) to call the appropriate bindings and access the features.