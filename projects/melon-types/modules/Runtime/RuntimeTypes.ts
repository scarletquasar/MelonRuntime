declare interface EventChain {
    startNew(caller: EventCaller, type: EventType, actions: EventAction[]): void;
    getEvents(condition?: Function): Map<string, Event>;
}

declare interface Event {
    name: string;
    type: EventType;
    caller: EventCaller;
    finished: boolean;
    run(): Promise<void>;
    finish(): void;
}

declare enum EventCaller {
    System,
    Cronjob,
    User
}

declare enum EventType {
    LocalInputOutput,
    RemoteInputOutput,
    InteropTransaction
}

declare type EventAction = {
    name: string,
    action: Function
}