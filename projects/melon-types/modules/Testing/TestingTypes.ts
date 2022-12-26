/// <reference path="./_test.ts" />

declare interface Assert {
    equals(excepted: any, actual: any): void;
    true(target: boolean): void;
    false(target: boolean): void;
    truthy<T>(target: T): void;
    falsy<T>(target: T): void;
} 

declare class AssertHandler {
    static getProblems(assert: Assert): string[];
}