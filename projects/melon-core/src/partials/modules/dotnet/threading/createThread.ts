function createThread(identifier: string) {
    const threadFactory = _$internalBinding["CreateThread"];
    
    return threadFactory(identifier);
}

export { createThread }