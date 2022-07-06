declare interface Queue {
    run: (condition: any) => boolean
}

declare const Queue: (callbackArray: Function[]) => void