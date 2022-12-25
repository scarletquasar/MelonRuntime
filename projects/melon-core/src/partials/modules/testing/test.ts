import { _write } from "../console/_write";
import { _writeLine } from "../console/_writeLine";
import { Assert, AssertHandler } from "./Assert";

function test(description: string, handler: (assert: Assert) => void) {
    const assertInstance = new Assert();
    handler(assertInstance);

    const problems = AssertHandler.getProblems(assertInstance);

    _writeLine("");
    _write("[Melon Test] ", "DarkYellow");
    _write(description, "Cyan");
    _writeLine("");

    if(problems.length) {
        problems.forEach(problem => {
            _write("[Melon Test] ", "DarkYellow");
            _write(problem, "Red");
            _writeLine("");
        });

        return;
    }

    _write("[Melon Test] ", "DarkYellow");
    _write("Ran with success", "Green");
    _writeLine("");
}

export { test }