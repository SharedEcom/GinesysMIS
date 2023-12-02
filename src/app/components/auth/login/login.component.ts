import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/common/navbar/navbar.service';
import { LoginRequest } from '../../../models/auth/login-request';
import { LoginResponse } from '../../../models/auth/login-response';
import { LoginServiceService } from '../../../services/auth/login/login-service.service';
import { ToastService } from 'src/app/services/common/toast/toast.service';
import { ToastTypes } from 'src/app/models/toast/toast-types';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

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

  constructor(private loginService: LoginServiceService, private router: Router, private navbarService: NavbarService, private toast: ToastService, private spinner: NgxSpinnerService) {
    this.loginRequest = new LoginRequest()
    this.loginResponse = new LoginResponse()
  }

  ngOnInit(): void {
    this.isNavbarVisible = this.navbarService.isNavbarVisible
  }

  login(username: string, password: string) {
    this.spinner.show()
    this.loginRequest.userName = username
    this.loginRequest.password = password
    let response = this.loginService.login(this.loginRequest);
    response.subscribe(data => {
      this.loginResponse = data

      if (data.serviceMessage.code === 200) {
        // this.toast.initiate({
        //   title: data.serviceMessage.type,
        //   content: data.serviceMessage.message,
        //   show: true,
        //   type: ToastTypes.success
        // });
        if (sessionStorage.getItem('authToken') === null) {
          this.assignTokenAndNavigate()
        } else {
          sessionStorage.clear()
          this.assignTokenAndNavigate()
        }
        this.navbarService.showNavbar();
        this.spinner.hide()
      } else {
        this.toast.initiate({
          title: data.serviceMessage.type,
          content: data.serviceMessage.message,
          show: true,
          type: ToastTypes.error
        });
        this.spinner.hide()
      }

      // this.spinner.hide()
    })
  }

  accessApi() {
    let token = sessionStorage.getItem('authToken')

    if (token !== null && token.length > 0) {
      let response = this.loginService.welcome(token)
      response.subscribe(data => {
        console.log(data)
      })
    }
  }

  assignTokenAndNavigate() {
    sessionStorage.setItem('authToken', this.loginResponse.result.authToken)
    sessionStorage.setItem('userDetails', JSON.stringify(this.loginResponse.result.userDetails))
this.router.navigateByUrl('/home')
    // this.router.navigateByUrl('/promo-signage')
    this.accessApi()
  }

}
