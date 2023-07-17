enum EventCaller {
    System,
    Cronjob,
    User
}

enum EventType {
    LocalInputOutput,
    RemoteInputOutput,
    InteropTransaction
}

type EventAction = {
    name: string,
    action: Function
}
  
type Event = {
    name: string;
    type: EventType;
    caller: EventCaller;
    finished: boolean;
    actions: EventAction[];
    toLoggableOutput: () => any;
    run: () => Promise<void>;
    finish: () => void;
}

interface EventChain {
    events: Map<string, Event>;
    startNew: (caller: EventCaller, type: EventType, actions: EventAction[]) => void;
    getEvents: (condition?: (event: Event) => boolean) => Map<string, Event> | Event[];
    toLoggableOutput: () => Record<string, any>;
}

type EventConstructor = new(caller: EventCaller, type: EventType, actions: EventAction[]) => Event;
type EventChainConstructor = new() => EventChain;

export { 
    Event, 
    EventAction, 
    EventCaller, 
    EventType, 
    EventChain, 
    EventConstructor, 
    EventChainConstructor 
}