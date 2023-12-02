import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../../services/auth/session/session.service';
import { BarcodeModel } from '../../../models/screens/promo-signage/Barcode-model';
import { BarcodeSaveResponse } from '../../../models/screens/promo-signage/login-response';
import { NavbarService } from '../../../services/common/navbar/navbar.service';
import { PromoSignageService } from '../../../services/screen/promo-signage/promo-signage.service';
import { ToastService } from '../../../services/common/toast/toast.service';
import { ItemInfoServiceService } from '../../../services/common/modal/item-info/item-info-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastTypes } from 'src/app/models/toast/toast-types';
import { ExcelService } from 'src/app/services/common/excel/excel.service';

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

  itemInfo: any
  excelResponse: any

  maxMrp: number = 0
  minMrp: number = 0

  mrp: any

  selectedFiles?: FileList;
  currentFile?: File;
  fileUploadResponse?: any;

  signageTypeList = [
    { id: 1, text: "SAVE Rs." },
    { id: 2, text: " Off %" },
    { id: 3, text: "BUY 1 GET FREE" },
    { id: 4, text: "BUY 2 GET FREE" },
    { id: 5, text: "ON MRP" },
    //   { id: 6, text: "Selling Price Format" },
    //   { id: 7, text: "On Pack Promo Offer" },
    //   { id: 8, text: "Selling Price Format" },
  ]

  constructor(private promoSignageService: PromoSignageService,
    private router: Router,
    private navbarService: NavbarService,
    private sessionService: SessionService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private itemInfoService: ItemInfoServiceService,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
    private excelService: ExcelService) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
    this.barcodeModelList.push(new BarcodeModel())

    if (sessionStorage.getItem('authToken') === null) {
      this.router.navigateByUrl("/")
    } else {
      if (!this.sessionService.tokenExpired(sessionStorage.getItem('authToken') || '')) {
        this.navbarService.isNavbarVisible = true
        this.isNavbarVisible = this.navbarService.isNavbarVisible
      } else {
        this.router.navigateByUrl("/")
      }
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

    this.spinner.show()

    const request: any = {
      "modelRequest": barcodeList
    }

    var modelRequestArray = request.modelRequest

    for (let index = 0; index < modelRequestArray.length; index++) {
      const element = modelRequestArray[index];

      var tempUserObject = sessionStorage.getItem('userDetails')
      if (tempUserObject !== null) {
        var userObject = JSON.parse(tempUserObject)

        element.siteCode = userObject.siteCode
      }

    }

    let response = this.promoSignageService.saveBarcode(request)
    response.subscribe((data: BarcodeSaveResponse) => {
      this.barcodeSaveResponse = data
      if (this.barcodeSaveResponse.serviceMessage.code == 201) {
        console.log('Data saved successfully')
        this.toast.showToaster(data, ToastTypes.success)
        // this.toast.initiate({
        //   title: data.serviceMessage.type,
        //   content: data.serviceMessage.message,
        //   show: true,
        //   type: ToastTypes.success
        // });
        // this.showSuccess()
        // this.showCustomSuccess(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showSuccess(data.serviceMessage.message, data.serviceMessage.type)
      } else {
        // this.showCustomDanger(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showError(data.serviceMessage.message, data.serviceMessage.type)
        this.toast.showToaster(data, ToastTypes.error)
        // this.toast.initiate({
        //   title: data.serviceMessage.type,
        //   content: data.serviceMessage.message,
        //   show: true,
        //   type: ToastTypes.error
        // });
      }

      this.spinner.hide()
    })
    this.barcodeModelList = Array<BarcodeModel>();
    this.barcodeModelList.push(new BarcodeModel())
  }

  printBarcodes() {
    this.router.navigateByUrl('/promo-signage-print')
  }

  showCustomSuccess(toastHeader: string, toastMessgae: string, delayValue: number) {
    // this.toastService.show(toastMessgae, { classname: 'bg-success text-light', delay: delayValue, header: toastHeader });
  }

  showCustomDanger(toastHeader: string, toastMessgae: string, delayValue: number) {
    // this.toastService.show(toastMessgae, { classname: 'bg-danger text-light', delay: delayValue, header: toastHeader });
  }

  // showDanger(dangerTpl: string | TemplateRef<any>) {
  //   this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  // }

  // showStandard() {
  //   this.toastService.show('I am a standard toast');
  // }

  // showSuccess() {
  //   this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  // }

  ngOnDestroy(): void {
    // this.toastService.clear();
  }
  open(content: any, index: any) {
    this.itemInfoService.setValue(this.barcodeModelList[index].barcode)
    this.modalService.open(content, { size: 'xl', centered: true, scrollable: true });

  }

  getBarcodeDetails(index: any) {
    this.spinner.show()
    this.itemInfoService.setValue(this.barcodeModelList[index].barcode)
    var siteCode
    var tempUserObject = sessionStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      var userObject = JSON.parse(tempUserObject)
      siteCode = userObject.siteCode
    }

    let response = this.itemInfoService.getBarcodeDetailById(siteCode)
    response.subscribe((data: any) => {
      if (data.serviceMessage.code == 200) {
        this.itemInfo = data.result
        // this.setMrpRange(this.itemInfo, this.barcodeModelList[index])

        if (this.barcodeModelList[index].signageTypeCode === 1) {
          this.maxMrp = data.result.mrp;
        }

        if (this.barcodeModelList[index].signageTypeCode === 2) {
          this.maxMrp = 100;
        }

        if (this.barcodeModelList[index].signageTypeCode === 3 || this.barcodeModelList[index].signageTypeCode === 4) {
          this.maxMrp = 10;
        }

        if (this.barcodeModelList[index].signageTypeCode === 5) {
          this.maxMrp = 0;
        }
        console.log('Data saved successfully')

        console.log('maxMrp:', this.maxMrp);
        console.log('minMrp:', this.minMrp);
        // this.showSuccess()
        // this.showCustomSuccess(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showSuccess(data.serviceMessage.message, data.serviceMessage.type)
      } else {
        console.log('Data not received');

        // this.showCustomDanger(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showError(data.serviceMessage.message, data.serviceMessage.type)
      }
    });
    this.spinner.hide()
  }

  validateMrp(input: any, index: number) {
    let value = input;
    if (value) {
      if (value < this.minMrp) value = this.minMrp;
      if (value > this.maxMrp) value = this.maxMrp;
      this.barcodeModelList[index].inputQty = value;
      // if (input.value != value) {
      //   const start = input.selectionStart ? input.selectionStart - 1 : -1;
      //   input.value = value;
      //   if (start > 0) input.selectionStart = input.selectionEnd = start;
      // }
    }
  }

  downloadEmptyExcel() {
    this.spinner.show()
    var siteCode
    var tempUserObject = sessionStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      var userObject = JSON.parse(tempUserObject)
      siteCode = userObject.siteCode
    }
    let response = this.excelService.getEmptyExcel(siteCode);

    response.subscribe((data: any) => {
      if (data.serviceMessage.code == 200) {
        this.excelResponse = data.result
        var mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
        var a = document.createElement('a');
        a.href = mediaType + data.result;
        a.download = 'Barcode-BulkUploadFile.xlsx';
        a.click()
        this.spinner.hide()
      }
    });
  }

  uploadFile(event: any): void {
    this.spinner.show()
    var siteCode
    var tempUserObject = sessionStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      var userObject = JSON.parse(tempUserObject)
      siteCode = userObject.siteCode
    }
    
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        let response = this.excelService.uploadBarcodeFile(this.currentFile, siteCode)
        response.subscribe((data: any) => {
          if (data.serviceMessage.code == 200) {
            this.fileUploadResponse = data.result
            this.currentFile = undefined;
            this.toast.showToaster(data, ToastTypes.success)
            this.spinner.hide()
          } else {
            this.toast.showToaster(data, ToastTypes.error)
          }
        }, (error: any) => {
          console.log(error)
          this.toast.initiate({
            title: error.error.error,
            content: error.error.message,
            show: true,
            type: ToastTypes.error
          });
        });
      }

      this.selectedFiles = undefined;
    }
    this.spinner.hide()
  }

}
