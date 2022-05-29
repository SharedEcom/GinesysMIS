import { CommonResponse } from "src/app/components/statics/models/common-response"

export class BarcodeSaveResponse {
    serviceMessage: CommonResponse
    result: any

    constructor() {
        this.serviceMessage = new CommonResponse()
        this.result = null
    }
}