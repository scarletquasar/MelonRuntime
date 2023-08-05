function addPrototypeExtension(base: any, name: string, value: any) {
    base["prototype"][name] = value;
}

export { addPrototypeExtension }