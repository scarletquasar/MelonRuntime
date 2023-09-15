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
    private year: number;
    private month: number;
    private day: number;
    private hour: number;
    private minute: number;
    private second: number;
    private millisecond: number;
    private microsecond: number;
    private nanosecond: number;
    private timezoneModifier: number;

    // System.DateTimeOffset
    private internalDateTimeObject: unknown;

    // TODO: Add checkers to values like hours, convert each 24 to day etc.. Repeat with other fields
    // maybe use internalDateTimeObject to do that internally with dotnet
    // TODO: Solve values that can be zero lead to "now" values due to checkers
    constructor(args: MomentArguments | Date) {
        const now = args instanceof Date ? args : new Date();
        this.year = (<MomentArguments>args).year ?? now.getFullYear(),
        this.month = (<MomentArguments>args).month ?? now.getMonth(),
        this.day = (<MomentArguments>args).day ?? now.getDay(),
        this.hour = (<MomentArguments>args).hour ?? now.getHours(),
        this.minute = (<MomentArguments>args).minute ?? now.getMinutes(),
        this.second = (<MomentArguments>args).second ?? now.getSeconds(),
        this.millisecond = (<MomentArguments>args).millisecond ?? 0,
        this.microsecond = (<MomentArguments>args).microsecond ?? 0,
        this.nanosecond = (<MomentArguments>args).nanosecond ?? 0,
        this.timezoneModifier = (<MomentArguments>args).timezoneModifier ?? 0
    }

    static now() {
        return new Moment(new Date());
    }

    static inYears() {

    }

    static inMonths() {
        
    }

    static inDays() {
        
    }

    static inHours() {
        
    }

    static inMinutes() {
        
    }

    static inSeconds() {
        
    }

    static inMilliseconds() {
        
    }

    static inMicroseconds() {
        
    }

    static inNanoseconds() {
        
    }


    copyWith(args: MomentArguments) {
        return new Moment({
            year: this.year + args.year ?? 0,
            month: this.month + args.month ?? 1,
            day: this.day + args.day ?? 0,
            hour: this.hour + args.hour ?? 0,
            minute: this.minute + args.minute ?? 0,
            second: this.second + args.second ?? 0,
            millisecond: this.millisecond + args.millisecond ?? 0,
            microsecond: this.microsecond + args.microsecond ?? 0,
            nanosecond: this.nanosecond + args.nanosecond ?? 0,
            timezoneModifier: args.timezoneModifier ?? 0,
        });
    }
}

export { Moment }