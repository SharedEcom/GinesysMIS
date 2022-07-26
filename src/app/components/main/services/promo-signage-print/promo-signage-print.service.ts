import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromoSignageResponse } from '../../models/promo-signage-print/promo-signage-print-response';

@Injectable({
  providedIn: 'root'
})
export class PromoSignagePrintService {

  BASE_URL: string = "http://10.100.1.106:8080/v1/promo-signage/"
  SAVE_BARCODE: String = "barcode/print"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public printBarcode(): Observable<PromoSignageResponse> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + localStorage.getItem('authToken'))
    return this.httpClient.get<PromoSignageResponse>(this.BASE_URL + this.SAVE_BARCODE, {headers: httpHeaders})
  }
}