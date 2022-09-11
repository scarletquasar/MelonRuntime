import { DatabaseProviderConstructor } from "./DatabaseProvideConstructor"

type Data = {
    clone: (value: any) => any,
    compare: <T>(
        target: T, 
        value: T, 
        expression?: Function, 
        customModifier?: Function
    ) => {
        comment: string,
        equals: boolean
    },
    PgClient: DatabaseProviderConstructor,
    MySqlClient: DatabaseProviderConstructor,
    SqlServerClient: DatabaseProviderConstructor
}

export { Data }