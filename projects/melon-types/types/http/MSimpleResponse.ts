type MSimpleResponse<R, MT extends string> = {
    type: MT,
    status: number,
    response: R
}

export { MSimpleResponse }