// Unsafe: Can allow prototype pollution; Should not be exposed

function addPrototypeExtension(base: any, name: string, value: any) {
    base["prototype"][name] = value;
}

export { addPrototypeExtension }