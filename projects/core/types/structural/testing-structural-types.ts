import { Assert } from "../internal/testing-types";

type TestingTest = (description: string, handler: (assert: Assert) => void) => void;

export { TestingTest }