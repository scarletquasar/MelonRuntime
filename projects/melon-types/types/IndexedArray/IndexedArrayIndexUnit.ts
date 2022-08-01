import { IndexedArray } from "../../IndexedArray";

type IndexedArrayIndexUnit<T> = Record<string, T[] | IndexedArray<T>>;

export { IndexedArrayIndexUnit }