declare class Result<TError extends Error, TValue> extends Either<TError, TValue> {
    match: (left: (error: TError) => void, right: (value: TValue) => void) => void;
    join(message?: string): void;
}

declare class Either<TLeft, TRight> {
    protected leftValue: TLeft | null;
    protected rightValue: TRight | null;

    static left<T>(value: T): Either<T, any>;
    static right<T>(value: T): Either<any, T>;

    fold<T>(
      left: (value: TLeft) => T | void,
      right: (value: TRight) => T | void
    ): T | void;
}

export { Result, Either }