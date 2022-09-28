function _static(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {
    return {
        status: 200,
        response,
        headers: {
            "Content-Type": type,
            ...headers
        }
    }
}

export { _static }