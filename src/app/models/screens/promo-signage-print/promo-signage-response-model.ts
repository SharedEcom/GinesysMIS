export class PromoSignageResponseModel {
    barcode: string;
    barcodeType: string;
    articleName: string;
    mrp: any;
    bannerName: string;
    quantity: any;

    constructor() {
        this.barcode = ''
        this.barcodeType = '';
        this.articleName = '';
        this.mrp = 0.0;
        this.bannerName = '';
        this.quantity = 0;
    }
}