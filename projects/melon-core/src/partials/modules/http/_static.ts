function _static(response: any, type: `${string}/${string}`) {
    return {
        type,
        status: 200,
        response
    }
}

export { _static }