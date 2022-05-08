export class BarcodeModel {
    barcode: String
    printQuantity: number
    signageTypeCode: number
    signageTypeName: String

    constructor() {
        this.barcode = ''
        this.printQuantity = 0
        this.signageTypeCode = 0
        this.signageTypeName = ''
    }
}