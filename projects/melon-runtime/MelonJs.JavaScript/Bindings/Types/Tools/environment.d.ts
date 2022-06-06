type Environment = {
    getVariable: (name: string) => any,
    getVariables: () => Record<string, any>,
    setVariable: (name: string, content: any) => void
}

declare const environment: Environment