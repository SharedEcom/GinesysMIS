import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarcodeSaveResponse } from 'src/app/models/screens/promo-signage/login-response';

@Injectable({
  providedIn: 'root'
})
export class PromoSignageService {

  BASE_URL: string = "http://localhost:8080/v1/promo-signage/"
  SAVE_BARCODE: String = "barcode/save"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public saveBarcode(request: any): Observable<BarcodeSaveResponse> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + localStorage.getItem('authToken'))
    return this.httpClient.post<BarcodeSaveResponse>(this.BASE_URL + this.SAVE_BARCODE, request, {headers: httpHeaders})
  }

  
}