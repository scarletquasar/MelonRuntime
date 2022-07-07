declare const Assert: {
    true: (target: boolean) => boolean;
    false: (target: boolean) => boolean;
    truthy: (target: any) => boolean;
    falsy: (target: any) => boolean;
    null: (target: any) => boolean;
    notNull: (target: any) => boolean;
    arrayIsEmpty: (target: any) => boolean;
    arrayIsNotEmpty: (target: any[]) => boolean;
    objectIsEmpty: (target: Record<any, any>) => boolean;
    objectIsNotEmpty: (target: Record<any, any>) => boolean;
    equals: (target1: any, target2: any) => boolean;
    notEquals: (target1: any, target2: any) => boolean;
};
export { Assert };
