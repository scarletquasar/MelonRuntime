import { _crypto } from "../../statics/_crypto";

class SharedBag<T> {
    private content: T[];
    private transactionOpen: boolean;
    private transactionToken: string;

    private NO_ACTIVE_TRANSACTION_ERROR = "No active transaction found in SharedBag<T>";
    private TRANSACTION_ALREADY_RUNNING_ERROR = "A SharedBag<T> transaction is already running";

    constructor(...content: T[]) {
        this.content = content;
    }

    beginTransaction() {
        if(!this.transactionOpen) {
            this.transactionToken = _crypto.randomUUID();
            this.transactionOpen = true;

            return this.transactionToken;
        }

        throw new Error(this.TRANSACTION_ALREADY_RUNNING_ERROR);
    }

    closeTransaction() {
        if(this.transactionOpen) {
            this.transactionToken = null;
            this.transactionOpen = false;
        }

        throw new Error(`${this.NO_ACTIVE_TRANSACTION_ERROR} to close`)
    }

    addFirst(item: T) {
        if(this.transactionOpen) {
            return this.content.unshift(item);
        }

        throw new Error(`${this.NO_ACTIVE_TRANSACTION_ERROR} to perform the action`)
    }

    addLast(item: T) {
        if(this.transactionOpen) {
            return this.content.push(item);
        }

        throw new Error(`${this.NO_ACTIVE_TRANSACTION_ERROR} to perform the action`)
    }
}

export { SharedBag }