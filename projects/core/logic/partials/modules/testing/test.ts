import { write, writeLine } from "logic/partials/modules/console/console-core";
import { Assert, AssertHandler } from "./Assert";

function test(description: string, handler: (assert: Assert) => void) {
    const assertInstance = new Assert();
    handler(assertInstance);

    const problems = AssertHandler.getProblems(assertInstance);

    (<Function>writeLine)("");
    (<Function>write)("[Melon Test] ", "DarkYellow");
    (<Function>write)(description, "Cyan");
    (<Function>writeLine)("");

    if(problems.length) {
        (<Function>writeLine)("");
        const testErrorMessage = problems.join("\n");
        const testError = new Error(testErrorMessage);

        throw testError;
    }

    (<Function>write)("[Melon Test] ", "DarkYellow");
    (<Function>write)("Ran with success", "Green");
    (<Function>writeLine)("");
}

export { test }