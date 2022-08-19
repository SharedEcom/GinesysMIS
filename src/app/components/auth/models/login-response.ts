import { CommonResponse } from "../../statics/models/common-response";

export class LoginResponse {
    serviceMessage: CommonResponse
    result: any

    constructor() {
        this.serviceMessage = new CommonResponse()
        this.result = {
            'authToken': '',
            'expiryDate': '',
            userDetails: {
                'firstName': '',
                'abbreviation': '',
                'password': null,
                'shortName': '',
                'siteCode': '',
                'siteName': '',
                'ecode': 0
            }
        }
    }
}