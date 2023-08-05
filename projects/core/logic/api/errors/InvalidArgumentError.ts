export class InvalidArgumentError extends Error {
    constructor(...causes: string[]) {
        super(`Invalid arguments: ${causes.join("; ")}`);
        this.name = "InvalidArgumentError";
    }
}