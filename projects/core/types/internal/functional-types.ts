declare class Result<TError extends Error, TRight> {
    protected leftValue?: TError;
    protected rightValue?: TRight;

    static left<T extends Error>(value: T): Result<T, any>;
    static right<T>(value: T): Result<any, T>;

    match<T>(
      handler: (ok: TRight) => T | void,
      catcher: (error: TError) => T | void
    ): T | void;
}

export { Result }