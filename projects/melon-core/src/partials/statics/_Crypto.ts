const _crypto = {
    randomUUID(): string {
        const rawUUID = _$internalBinding["CallStaticMethod"]("System", "Guid", "NewGuid", []);

        return rawUUID.toString();
    }
}

export { _crypto }