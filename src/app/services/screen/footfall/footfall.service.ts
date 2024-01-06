import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FootfallViewResponse } from 'src/app/models/screens/footfall/footfall-view-response';

@Injectable({
  providedIn: 'root'
})
export class FootfallService {

  BASE_URL: string = "http://localhost:8080/v1/footfall/"

//  BASE_URL: string = "https://signageauth.vmart.co.in/v1/footfall/"
  VIEW_FOOT_FALL: String = "view"
  BEARER = 'Bearer '
  ADD_FOOT_FALL: String = "add" 
  UPDATE_FOOT_FALL: String = "update/"
//  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public viewFootfall(today: any): Observable<FootfallViewResponse> {
    const storageData = this.getStorageJson()

    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken'))
      .set("userCode", storageData.userCode)
      .set("siteCode", storageData.siteCode)
      // .set("siteCode", siteCode)
      .set("dt", String(today))

    return this.httpClient.get<FootfallViewResponse>(this.BASE_URL + this.VIEW_FOOT_FALL, { headers: httpHeaders })
  }

  public addFootfall(request: any): Observable<FootfallViewResponse> {

    Object.entries(this.getStorageJson()).map(([key, value]) => {
      request[key] = value
    })

    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken'))
    return this.httpClient.post<FootfallViewResponse>(this.BASE_URL + this.ADD_FOOT_FALL , request, { headers: httpHeaders })
  }

  public updateFootfall(request: any, id: any): Observable<FootfallViewResponse> {

    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken'))
    return this.httpClient.put<FootfallViewResponse>((this.BASE_URL + this.UPDATE_FOOT_FALL + id), request, { headers: httpHeaders })
  }

  getStorageJson() {
    const storageData = sessionStorage.getItem("userDetails")
    return {
      'siteCode': String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).siteCode),
      'siteName': String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).siteName),
      'userCode': String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).ecode),
      'firstName': String(((storageData || null !== storageData) ? JSON.parse(storageData) : null).firstName)
    }
  }
}