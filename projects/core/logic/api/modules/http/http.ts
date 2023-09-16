//Logic imports
import { requestAsync, createHost, customResponse, objectResponse } from "logic/api/modules/http/http-basic-core"

const server = {
    _apps: {},
    requestAsync,
    createHost,
    objectResponse,
    customResponse
}

export { server }