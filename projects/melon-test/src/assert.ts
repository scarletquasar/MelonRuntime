const assert = {
    true: (target: boolean) => target,
    false: (target: boolean) => !target,
    truthy: (target: any) => Boolean(target),
    falsy: (target: any) => !Boolean(target),
    null: (target: any) => target === null,
    notNull: (target: any) => target !== null,
    arrayIsEmpty: (target: any) => target.length === 0,
    arrayIsNotEmpty: (target: any[]) => target.length > 0,
    objectIsEmpty: (target: Record<any, any>) => Object.keys(target).length === 0,
    objectIsNotEmpty: (target: Record<any, any>) => Object.keys(target).length > 0,
    equals: (target1: any, target2: any) => data.compare(target1, target2, (x: any, y: any) => x === y),
    notEquals: (target1: any, target2: any) => data.compare(target1, target2, (x: any, y: any) => x !== y),
}