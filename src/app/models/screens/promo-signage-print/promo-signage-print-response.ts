import { CommonResponse } from "../../common-response"

export class PromoSignageResponse {
    serviceMessage: CommonResponse
    result: any[]

    constructor() {
        this.serviceMessage = new CommonResponse()
        this.result = [
            {
                barcode: '',
                barcodeType: '',
                articleName: '',
                mrp: 0.0,
                bannerName: '',
                quantity: 0
            }
        ]
    }
}