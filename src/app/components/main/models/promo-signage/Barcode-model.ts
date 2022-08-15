export class BarcodeModel {
    barcode: string
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