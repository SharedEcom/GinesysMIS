import { Component, OnInit } from '@angular/core';
import { ItemInfoServiceService } from '../item-info-service.service';
import { ItemInfoResponse } from '../model/item-info-response';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  itemInfo: any

  constructor(private itemInfoService: ItemInfoServiceService) { }

  ngOnInit(): void {
    let response = this.itemInfoService.getBarcodeDetailById()
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