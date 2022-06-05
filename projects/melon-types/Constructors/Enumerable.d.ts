declare type Enumerable = {
    elements: any[],
    where: (filter: (this: any) => boolean) => Enumerable,
}