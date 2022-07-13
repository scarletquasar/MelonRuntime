declare class Queue {
    constructor(callbackArray: Function[]);
    run: (condition: Function) => number;
}