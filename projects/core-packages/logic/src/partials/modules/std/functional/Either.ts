class Either<TLeft, TRight> {
    protected leftValue: TLeft = null;
    protected rightValue: TRight = null;

    static left<T>(value: T) {
        const either = new Either<T, any>();
        either.leftValue = value;
        return either;
    }

    static right<T>(value: T) {
        const either = new Either<any, T>();
        either.leftValue = value;
        return either;
    }

    fold<T>(left: (x: TLeft) => T | void, right: (x: TRight) => T | void) {
        return !!this.leftValue ? left(this.leftValue) : right(this.rightValue); 
    }
}

export { Either }