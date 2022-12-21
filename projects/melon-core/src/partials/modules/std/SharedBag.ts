import { _crypto } from "../../statics/_crypto";

class SharedBag<T> {
    private static bags: Record<string, SharedBag<any>>;

    static get<T>(identifier: string) {
        return SharedBag.bags[identifier] as SharedBag<T>;
    }

    public content: T;
    public identifier: string;

    constructor(content: T) {
        this.content = content;
        
        this.identifier = _crypto.randomUUID();
        SharedBag.bags[this.identifier] = this;
    }
}

export { SharedBag }