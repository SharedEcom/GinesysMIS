import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemInfoResponse } from '../../../../models/common/modal/item-info/item-info-response';

@Injectable({
  providedIn: 'root'
})
export class ItemInfoServiceService {

//    BASE_URL: string = "http://localhost:8080/v1/promo-signage/"
//    BASE_URL: string = "http://10.100.1.106:8080/v1/promo-signage/"
  BASE_URL: string = "https://signageauth.vmart.co.in/v1/promo-signage/" 
VIEW_BARCODE: String = "barcode/"
  BEARER = 'Bearer '
  ITEM_CODE: string = ''

  constructor(private httpClient: HttpClient) { }

  setValue(id: string) {
    this.ITEM_CODE = id
  }

  getValue() {
    return this.ITEM_CODE
  }

  public getBarcodeDetailById(siteCode: any): Observable<ItemInfoResponse> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken')).set("barcode", this.ITEM_CODE).set('siteCode', siteCode)
    return this.httpClient.get<ItemInfoResponse>(this.BASE_URL + this.VIEW_BARCODE, { headers: httpHeaders })
  }
}