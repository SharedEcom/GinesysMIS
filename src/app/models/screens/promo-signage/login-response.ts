import { CommonResponse } from "src/app/models/common-response"

export class BarcodeSaveResponse {
    serviceMessage: CommonResponse
    result: any

    constructor() {
        this.serviceMessage = new CommonResponse()
        this.result = null
    }
}