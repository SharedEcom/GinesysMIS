import { CommonResponse } from '../../../../../statics/models/common-response'

export class SiteListResponse {
    serviceMessage: CommonResponse
    result: any[]

    constructor() {
        this.serviceMessage = new CommonResponse()
        this.result = [
            {
                siteName: '',
                shortName: '',
                siteCode: ''
            }
        ]
    }
}