import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FootfallViewResponse } from 'src/app/models/screens/footfall/footfall-view-response';

@Injectable({
  providedIn: 'root'
})
export class FootfallService {

  BASE_URL: string = "http://localhost:8080/v1/footfall/"
  VIEW_FOOT_FALL: String = "view"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public viewFootfall(today: any): Observable<FootfallViewResponse> {
    const storageData = sessionStorage.getItem("userDetails")

    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken'))
      .set("userCode", String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).ecode))
      .set("siteCode", String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).siteCode))
      // .set("siteCode", siteCode)
      .set("dt", String(today))
      
    return this.httpClient.get<FootfallViewResponse>(this.BASE_URL + this.VIEW_FOOT_FALL, { headers: httpHeaders })
  }
}