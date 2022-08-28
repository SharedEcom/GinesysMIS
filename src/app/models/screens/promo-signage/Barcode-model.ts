export class BarcodeModel {
    barcode: string
    printQuantity: number
    signageTypeCode: number
    signageTypeName: String
    siteCode: number
    inputQty: number

    constructor() {
        this.barcode = ''
        this.printQuantity = 0
        this.signageTypeCode = 0
        this.signageTypeName = ''
        this.siteCode = 0
        this.inputQty = 0
    }
}