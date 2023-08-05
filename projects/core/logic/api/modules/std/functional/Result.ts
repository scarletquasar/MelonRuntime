class Result<TLeft extends Error, TRight> {
    protected leftValue: TLeft = null;
    protected rightValue: TRight = null;

    static left<T extends Error>(value: T) {
        const either = new Result<T, any>();
        either.leftValue = value;
        return either;
    }

    static right<T>(value: any) {
        const either = new Result<any, T>();
        either.leftValue = value;
        return either;
    }

    match<T>(ok: (result: TRight) => T | void, catcher: (error: TLeft) => T | void) {
        if (this.leftValue) {
            return catcher(this.leftValue) as T;
        }

        if (this.rightValue) {
            return ok(this.rightValue) as T;
        }
    }
}

export { Result }