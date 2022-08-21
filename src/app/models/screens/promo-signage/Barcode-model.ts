export class BarcodeModel {
    barcode: string
    printQuantity: number
    signageTypeCode: number
    signageTypeName: String
    siteCode: number

    constructor() {
        this.barcode = ''
        this.printQuantity = 0
        this.signageTypeCode = 0
        this.signageTypeName = ''
        this.siteCode = 0
    }
}