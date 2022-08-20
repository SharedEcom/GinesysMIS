export class CommonResponse {
    code: number
    type: string
    message: string

    constructor() {
        this.code = 0;
        this.type = ''
        this.message = ''
    }
}