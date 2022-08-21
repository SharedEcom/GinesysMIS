import { Component, OnInit } from '@angular/core';
import { ItemInfoResponse } from 'src/app/models/common/modal/item-info/item-info-response';
import { ItemInfoServiceService } from 'src/app/services/common/modal/item-info/item-info-service.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  itemInfo: any

  constructor(private itemInfoService: ItemInfoServiceService) { }

  ngOnInit(): void {
 var siteCode
    var tempUserObject = localStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      var userObject = JSON.parse(tempUserObject)
      siteCode = userObject.siteCode
    }

      let response = this.itemInfoService.getBarcodeDetailById(siteCode)
    response.subscribe((data: ItemInfoResponse) => {
      if (data.serviceMessage.code == 200) {
        this.itemInfo = data.result
        console.log('Data saved successfully')
        // this.showSuccess()
        // this.showCustomSuccess(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showSuccess(data.serviceMessage.message, data.serviceMessage.type)
      } else {
        console.log('Data not received');
        
        // this.showCustomDanger(data.serviceMessage.type, data.serviceMessage.message, 10000);
        // this.toastr.showError(data.serviceMessage.message, data.serviceMessage.type)
      }
    });
  }
}