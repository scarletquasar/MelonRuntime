# Feature Coverage

Feature coverage is a planning page where you can check what already exists in Melon, as well as what has not yet been implemented and is waiting for the next versions to be added. It is separated into two phases: **Default**, which has global features determined by documentation, specifications and general use of devs and runtimes and **Miscellaneous** which is an internal planning/comparison of Melon, where there are features that will be or have already been implemented.

- Status:
    - 🟩 Fully implemented
    - 🟧 Unstable implementation
    - 🟨 Partially implemented
    - 🟥 Not implemented

## Default

| Name | Status | Reference |
| ---- | ------ | --------- |
| console | 🟨 | [Spec](https://console.spec.whatwg.org/) |
| crypto | 🟨 | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto) |
| setTimeout | 🟧🟨 | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) |
| setInterval | 🟧🟨 | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) |
| fetch | 🟥 | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) |
| Map() | 🟩 | [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) |
| Set() | 🟩 | [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) |

Melon also supports all EcmaScript features from [Jint](https://github.com/sebastienros/jint) *v3.0.0-beta-2041*.