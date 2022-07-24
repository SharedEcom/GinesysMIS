import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeModel } from '../models/promo-signage/Barcode-model';
import { BarcodeSaveResponse } from '../models/promo-signage/login-response';
import { NavbarService } from '../services/navbar/navbar.service';
import { PromoSignageService } from '../services/promo-signage/promo-signage.service';
import { ToasterServiceService } from '../services/toast/toaster-service.service';

@Component({
  selector: 'app-promo-signage',
  templateUrl: './promo-signage.component.html',
  styleUrls: ['./promo-signage.component.css']
})
export class PromoSignageComponent implements OnInit {

  isNavbarVisible: boolean = false;

  promoSignageArraySize = 1
  barcodeModelList = Array<BarcodeModel>();

  barcodeSaveResponse = new BarcodeSaveResponse()

  signageTypeList = [
    { id: 1, text: "SAVE Format" },
    { id: 2, text: "Buy 1 Get 1 FREE" },
    { id: 3, text: "Buy 2 Get 1 FREE" },
    { id: 4, text: "% Off Format" },
    { id: 5, text: "Power Pricing" },
    { id: 6, text: "Selling Price Format" },
    { id: 7, text: "On Pack Promo Offer" },
    { id: 8, text: "Selling Price Format" },
  ]

  constructor(private promoSignageService: PromoSignageService, private router: Router, private toastr: ToasterServiceService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.barcodeModelList.push(new BarcodeModel())
    console.log(this.navbarService.isNavbarVisible)

    if (localStorage.getItem('authToken') === null) {
      this.router.navigateByUrl("/")
    } else {
      this.isNavbarVisible = this.navbarService.isNavbarVisible
    }
  }

  increasePromoArraySize() {
    this.promoSignageArraySize++
    this.barcodeModelList.push(new BarcodeModel())
  }

  decreasePromoArraySize(index: BarcodeModel) {
    this.promoSignageArraySize--
    this.barcodeModelList.splice(this.barcodeModelList.indexOf(index), 1)
  }

  assignSignage(barcodeModel: BarcodeModel, signageIdEvent: any) {
    const signageId = signageIdEvent.target.value
    barcodeModel.signageTypeCode = parseInt(signageId) + 1
    barcodeModel.signageTypeName = this.signageTypeList[signageId].text
  }

  saveBarcode(barcodeList: Array<BarcodeModel>) {
    const request: any = {
      "modelRequest": barcodeList
    }

    let response = this.promoSignageService.saveBarcode(request)
    response.subscribe(data => {
      this.barcodeSaveResponse = data

      if (data.serviceMessage.code === 201) {
        console.log('Data saved successfully')
        this.toastr.showSuccess(data.serviceMessage.message, data.serviceMessage.type)
      } else {
        this.toastr.showError(data.serviceMessage.message, data.serviceMessage.type)
      }
    })
    this.barcodeModelList = Array<BarcodeModel>();
    this.barcodeModelList.push(new BarcodeModel())
  }

  printBarcodes() {
    this.router.navigateByUrl('/promo-signage-print')
  }

  showSuccess() {
    const saveBarcodeToast = document.getElementById('saveBarcodeToast')
    // const toast = new bootstrap
  }
}
