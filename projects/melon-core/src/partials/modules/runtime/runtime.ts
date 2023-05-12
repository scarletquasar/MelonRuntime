import { Event } from "./runtime-event";
import { EventChain } from "./runtime-event";

const eventChain = new EventChain();

export const runtime = {
    Event,
    eventChain
}