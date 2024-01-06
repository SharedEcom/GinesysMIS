import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteListResponse } from '../../../../models/common/modal/site-list/site-info-response';

@Injectable({
  providedIn: 'root'
})
export class SiteListService {

// BASE_URL: string = "http://localhost:8080/v1/promo-signage/"
//  BASE_URL: string = "http://10.100.1.106:8080/v1/promo-signage/"
 BASE_URL: string = "https://signageauth.vmart.co.in/v1/promo-signage/" 
  VIEW_BARCODE: String = "site/"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }


  public getSiteInfoByUserCode(eCode: number): Observable<SiteListResponse> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken'))
    return this.httpClient.get<SiteListResponse>(this.BASE_URL + this.VIEW_BARCODE + eCode, { headers: httpHeaders })
  }
}
