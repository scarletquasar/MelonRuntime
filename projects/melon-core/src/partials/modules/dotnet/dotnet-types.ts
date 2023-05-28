type DotnetFetchExpression = `${string}:${string}:${string}`;
type InteropMethod<T> = (...args: unknown[]) => T;

export { DotnetFetchExpression, InteropMethod }