import { Component, OnInit } from '@angular/core';
import { BarcodeModel } from '../models/promo-signage/Barcode-model';

@Component({
  selector: 'app-promo-signage',
  templateUrl: './promo-signage.component.html',
  styleUrls: ['./promo-signage.component.css']
})
export class PromoSignageComponent implements OnInit {

  promoSignageArraySize = 1
  barcodeModelList = Array<BarcodeModel>(this.promoSignageArraySize);

  constructor() { }

  ngOnInit(): void {
  }

  increasePromoArraySize() {
    this.promoSignageArraySize++
    this.barcodeModelList.push(new BarcodeModel())
  }

  decreasePromoArraySize(index: BarcodeModel) {
    this.promoSignageArraySize--
    this.barcodeModelList.splice(this.barcodeModelList.indexOf(index), 1)
  }

}
