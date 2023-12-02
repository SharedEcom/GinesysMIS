import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  BASE_URL: string = "http://localhost:8080/v1/promo-signage/barcode/bulk-upload/"

  DOWNLOAD_EMPTY_EXCEL_URL: string = "download-template"
  UPLOAD_EXCEL_URL: string = "upload"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public getEmptyExcel(siteCode: any): Observable<any> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken')).set('siteCode', siteCode)
    return this.httpClient.get<any>(this.BASE_URL + this.DOWNLOAD_EMPTY_EXCEL_URL, { headers: httpHeaders })
  }

  public uploadBarcodeFile(file: File, siteCode: any):Observable<any> {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + sessionStorage.getItem('authToken')).set('siteCode', siteCode)

    const formData: FormData = new FormData();
    formData.append('uploadFile', file);

    return this.httpClient.post<any>(this.BASE_URL + this.UPLOAD_EXCEL_URL, formData, { headers: httpHeaders })
  }
}
