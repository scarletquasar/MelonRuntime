type MomentArguments = {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
    timezoneModifier?: number;
};

class Moment {
    private _year: number;
    private _month: number;
    private _day: number;
    private _hour: number;
    private _minute: number;
    private _second: number;
    private _millisecond: number;
    private _microsecond: number;
    private _nanosecond: number;
    private _timezoneModifier: number;

    public get year() { return this._year };
    public get month() { return this._month };
    public get day() { return this._day };
    public get hour() { return this._hour };
    public get minute() { return this._minute };
    public get second() { return this._second };
    public get milissecond() { return this._millisecond };
    public get microsecond() { return this._microsecond };
    public get nanosecond() { return this._nanosecond };
    public get timezoneModifier() { return this._timezoneModifier };

    constructor(args: MomentArguments | Date) {
        const now = args instanceof Date ? args : new Date();

        this._year = (<MomentArguments>args).year ?? now.getFullYear(),
        this._month = (<MomentArguments>args).month ?? now.getMonth(),
        this._day = (<MomentArguments>args).day ?? now.getDay(),
        this._hour = (<MomentArguments>args).hour ?? now.getHours(),
        this._minute = (<MomentArguments>args).minute ?? now.getMinutes(),
        this._second = (<MomentArguments>args).second ?? now.getSeconds(),
        this._millisecond = (<MomentArguments>args).millisecond ?? 0,
        this._microsecond = (<MomentArguments>args).microsecond ?? 0,
        this._nanosecond = (<MomentArguments>args).nanosecond ?? 0,
        this._timezoneModifier = (<MomentArguments>args).timezoneModifier ?? 0

        // Criteria to throw an argument-related error
        const invalidMonth = this.month < 1 || this.month > 12;
        const invalidDay = this._day < 1 || (this.month === 2 && this._day > 29) || this._day > 30;
        const invalidHour = this._hour < 0 || this.hour > 24;
        const invalidMinute = this.minute < 0 || this.minute > 60;
        const invalidSecond = this.second < 0 || this.second > 60;
        const invalidMilissecond = this.milissecond < 0 || this.milissecond > 999;
        const invalidMicrosecond = this.microsecond < 0 || this.microsecond > 999;
        const invalidNanosecond = this.nanosecond < 0 || this.nanosecond > 999;

        const shouldThrow = 
            invalidMonth || 
            invalidDay || 
            invalidHour || 
            invalidMinute || 
            invalidSecond || 
            invalidMicrosecond || 
            invalidMilissecond || 
            invalidNanosecond;

        if (shouldThrow) throw new Error("Invalid values for making a time representation.");
    }

    copyWith(args: MomentArguments) {
        return new Moment({
            year: this._year + args.year ?? 0,
            month: this._month + args.month ?? 1,
            day: this._day + args.day ?? 0,
            hour: this._hour + args.hour ?? 0,
            minute: this._minute + args.minute ?? 0,
            second: this._second + args.second ?? 0,
            millisecond: this._millisecond + args.millisecond ?? 0,
            microsecond: this._microsecond + args.microsecond ?? 0,
            nanosecond: this._nanosecond + args.nanosecond ?? 0,
            timezoneModifier: args.timezoneModifier ?? 0,
        });
    }
}

export { Moment }