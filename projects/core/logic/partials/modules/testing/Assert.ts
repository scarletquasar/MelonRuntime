import { _compare } from "logic/partials/modules/data/_compare";

class AssertHandler {
    static getProblems(assert: Assert) {
        return (<any>assert).problems as string[];
    }
}

class Assert {
    private problems: string[];

    constructor() {
        this.problems = new Array<string>();
    }

    equals(excepted: any, actual: any) {
        const thisEquals = excepted === actual;

        if(!thisEquals) {
            this.problems.push(`The objects doesn't match`);
        }
    } 

    true(target: boolean) {
        if(!target) {
            this.problems.push(`Excepted true but got ${target}`);
        }
    }

    false(target: boolean) {
        if(target) {
            this.problems.push(`Excepted false but got ${target}`);
        }
    }

    truthy<T>(target: T) {
        if((target && 0) != 0) {
            this.problems.push(`Value ${target} is not truthy`);
        }
    }

    falsy<T>(target: T) {
        if((target && 0) == 0) {
            this.problems.push(`Value ${target} is not falsy`);
        }
    }
}

export { Assert, AssertHandler }