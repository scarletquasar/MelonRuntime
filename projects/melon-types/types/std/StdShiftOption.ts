import { StdShiftOptionCallback } from "./StdShiftOptionCallback";

type StdShiftOption<T> = (target: T, callback: StdShiftOptionCallback) => StdShiftOption<T>

export { StdShiftOption }