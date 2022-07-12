
type Std = {
    Promise: (resolve: Function, reject?: Function) => void
    shift: (value: any) => any
    system: {
        osInformation: {
            platform: string
            version: string,
            servicePack: string
        }
    },
}