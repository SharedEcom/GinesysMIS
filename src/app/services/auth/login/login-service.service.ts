import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth/login-response';

import { LoginRequest } from '../../../models/auth/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  BASE_URL: string = "http://localhost:8080/v1/auth/"
  BEARER = 'Bearer '

  constructor(private httpClient: HttpClient) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + "sign-in", request)
  }

  public welcome(token: String) {
    const httpHeaders = new HttpHeaders().set("Authorization", this.BEARER + token)
    return this.httpClient.get(this.BASE_URL, {headers: httpHeaders, responseType: 'text' as 'json'})
  }
}
