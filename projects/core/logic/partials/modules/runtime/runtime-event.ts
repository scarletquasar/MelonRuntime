//Type Imports
import type { OutputFriendly } from "types/internal/generic-types";
import type { EventType, EventCaller, EventAction } from "types/internal/runtime-types";

//Logic Imports
import { _crypto } from "logic/partials/statics/_Crypto";
import { _log } from "logic/partials/modules/console/_log";

class Event implements OutputFriendly {
    public name: string;
    public type: EventType;
    public caller: EventCaller;
    public finished: boolean;

    private actions: EventAction[];

    constructor(
        name: string, 
        caller: EventCaller, 
        type: EventType, 
        actions: EventAction[]
    ) {
        this.name = name;
        this.actions = actions;
        this.type = type;
        this.caller = caller;
        this.finished = false;
    }

    toLoggableOutput() {
        return {
            name: this.name,
            type: this.type,
            caller: this.caller,
            finished: this.finished
        }
    }

    async run(): Promise<void> {
        if (!this.actions.length || this.finished) {
            this.finished = true;
            return;
        }

        const nextAction = this
            .actions
            .shift()
            .action;

        const wrapper = () => {
            nextAction();
            return true;
        }

        await Promise.resolve(wrapper());
        await this.run();
    }

    finish() {
        this.finished = true;
    }
}

class EventChain implements OutputFriendly {
    private events: Map<string, Event>;

    constructor() {
        this.events = new Map();
    }

    startNew(caller: EventCaller, type: EventType, actions: EventAction[]) {
        const name = _crypto.randomUUID();
        const event = new Event(name, caller, type, actions);
        this.events.set(name, event);
        this.events.get(name).run();
    }

    getEvents(condition: Function = null) {
        if (!condition) {
            return this.events;
        }
        
        const resultMap = new Map<string, Event>();

        for (const event of this.events) {
            if (condition(event[1])) {
                resultMap.set(event[0], event[1]);
            }
        }

        return resultMap;
    }

    toLoggableOutput() {
        const result = {};

        this.events.forEach((event: OutputFriendly, key: string) => { 
            const outputEvent = event.toLoggableOutput();
            result[key] = outputEvent;
        });
        
        return result;
    }
}

export { Event, EventCaller, EventType, EventAction, EventChain }