const assert = {
    true: (target: boolean) => target,
    false: (target: boolean) => !target,
    truthy: (target: any) => Boolean(target),
    falsy: (target: any) => !Boolean(target),
    null: (target: any) => target === null,
    notNull: (target: any) => target !== null,
    isEmpty: (target: any) => target.length === 0,
    isNotEmpty: (target: any[]) => target.length > 0
}