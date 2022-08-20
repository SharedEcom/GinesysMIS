import { Component, OnInit } from '@angular/core';
import { SiteListResponse } from 'src/app/models/common/modal/site-list/site-info-response';
import { SiteListService } from 'src/app/services/common/modal/site-list/site-list.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  siteList: any

  constructor(private siteListService: SiteListService) { }

  ngOnInit(): void {

    var userObject

    var tempUserObject = localStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      userObject = JSON.parse(tempUserObject)

      let response = this.siteListService.getSiteInfoByUserCode(userObject.ecode)
      response.subscribe((data: SiteListResponse) => {
        if (data.serviceMessage.code == 200) {
          this.siteList = data.result
          console.log(data.serviceMessage.message)
          // this.showSuccess()
          // this.showCustomSuccess(data.serviceMessage.type, data.serviceMessage.message, 10000);
          // this.toastr.showSuccess(data.serviceMessage.message, data.serviceMessage.type)
        } else {
          console.log(data.serviceMessage.message);
          // this.showCustomDanger(data.serviceMessage.type, data.serviceMessage.message, 10000);
          // this.toastr.showError(data.serviceMessage.message, data.serviceMessage.type)
        }
      });
    }
  }

  changeSiteCodeInLocalStorage(site: any) {

    var userObject

    var tempUserObject = localStorage.getItem('userDetails')
    if (tempUserObject !== null) {
      userObject = JSON.parse(tempUserObject)
      userObject.siteCode = site.siteCode
      userObject.shortName = site.shortName
      userObject.siteName = site.siteName
      localStorage.setItem('userDetails', JSON.stringify(userObject))
      console.log((localStorage.getItem('userDetails')));
      
    }
  }

}
