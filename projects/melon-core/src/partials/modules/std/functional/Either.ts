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

    fold<T>(left: (x: TLeft) => T, right: (x: TRight) => T) {
        return !!this.leftValue ? left(this.leftValue) : right(this.rightValue); 
    }
}

export { Either }