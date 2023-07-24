declare class Result<TError extends Error, TRight> {
    protected leftValue?: TError;
    protected rightValue?: TRight;

    static left<T extends Error>(value: T): Result<T, any>;
    static right<T>(value: T): Result<any, T>;

    fold<T>(
      left: (value: TError) => T | void,
      right: (value: TRight) => T | void
    ): T | void;
}

export { Result }