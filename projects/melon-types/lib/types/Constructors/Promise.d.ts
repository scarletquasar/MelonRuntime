declare class MPromiseConstructorInternal {
  constructor(resolve: Function, reject?: Function);
  readonly prototype: Promise<any>;
  new<T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
  reject<T = never>(reason?: any): Promise<T>;
  resolve(): Promise<void>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}