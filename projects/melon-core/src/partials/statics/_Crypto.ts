const _crypto = {
    randomUUID() {
        const rawUUID = _$internalBinding["CallStaticMethod"]("System", "Guid", "NewGuid", []);

        return rawUUID.toString();
    }
}

export { _crypto }