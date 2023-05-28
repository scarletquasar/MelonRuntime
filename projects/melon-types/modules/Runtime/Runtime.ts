declare const Runtime: {
    Event: new (
        name: string, 
        caller: EventCaller, 
        type: EventType, 
        actions: EventAction[]
    ) => Event,
    EventChain: new () => EventChain
    eventChain: EventChain
}