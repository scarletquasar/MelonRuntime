//Logic Imports
import { EventChain, Event } from "logic/api/modules/runtime/runtime-event";

const eventChain = new EventChain();

export const runtime = {
    Event,
    EventChain,
    eventChain
}