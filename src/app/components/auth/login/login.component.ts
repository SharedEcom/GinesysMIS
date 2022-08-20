import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/common/navbar/navbar.service';
import { LoginRequest } from '../../../models/auth/login-request';
import { LoginResponse } from '../../../models/auth/login-response';
import { LoginServiceService } from '../../../services/auth/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNavbarVisible?: boolean

  username!: string
  password!: string

  loginRequest: LoginRequest;
  loginResponse: LoginResponse;

  constructor(private loginService: LoginServiceService, private router: Router, private navbarService: NavbarService) {
    this.loginRequest = new LoginRequest()
    this.loginResponse = new LoginResponse()
  }

  ngOnInit(): void {
    this.isNavbarVisible = this.navbarService.isNavbarVisible
  }

  login(username: string, password: string) {

    this.loginRequest.userName = username
    this.loginRequest.password = password
    let response = this.loginService.login(this.loginRequest);
    response.subscribe(data => {
      this.loginResponse = data

      if (data.serviceMessage.code === 200) {
        if (localStorage.getItem('authToken') === null) {
          this.assignTokenAndNavigate()
        } else {
          localStorage.clear()
          this.assignTokenAndNavigate()
        }
        this.navbarService.showNavbar();
      }
    })
  }

  accessApi() {
    let token = localStorage.getItem('authToken')
    
    if ( token !== null && token.length > 0) {
      let response = this.loginService.welcome(token)
      response.subscribe(data => {
        console.log(data)
      })
    }
  }

  assignTokenAndNavigate() {
    localStorage.setItem('authToken', this.loginResponse.result.authToken)
    localStorage.setItem('userDetails', JSON.stringify(this.loginResponse.result.userDetails))
    this.router.navigateByUrl('/promo-signage')
    this.accessApi()
  }

}
