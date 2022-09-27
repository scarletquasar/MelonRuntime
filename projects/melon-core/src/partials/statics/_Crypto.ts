const _crypto = {
    randomUUID() {
        const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];
        const rawUUID = callStaticMethodBinding("System", "Guid", "NewGuid", []);

        return rawUUID.toString();
    }
}

export { _crypto }