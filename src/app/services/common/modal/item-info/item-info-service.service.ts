import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemInfoResponse } from 'src/app/models/common/modal/item-info/item-info-response';

@Injectable({
  providedIn: 'root'
})
export class ItemInfoServiceService {

  BASE_URL: string = "http://localhost:8080/v1/promo-signage/"
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

  public getBarcodeDetailById(): Observable<ItemInfoResponse> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + localStorage.getItem('authToken')).set("barcode", this.ITEM_CODE)
    return this.httpClient.get<ItemInfoResponse>(this.BASE_URL + this.VIEW_BARCODE, { headers: httpHeaders })
  }
}