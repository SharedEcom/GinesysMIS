import { Component, NgModule, OnInit } from '@angular/core';
import { SessionService } from '../../../services/auth/session/session.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/common/navbar/navbar.service';
import { FootfallService } from 'src/app/services/screen/footfall/footfall.service';
import { FootfallViewResponse } from 'src/app/models/screens/footfall/footfall-view-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/common/toast/toast.service';
import { ToastTypes } from 'src/app/models/toast/toast-types';

@Component({
  selector: 'app-footfall',
  templateUrl: './footfall.component.html',
  styleUrls: ['./footfall.component.css']
})

export class FootfallComponent implements OnInit {

  token: string = ''

  isNavbarVisible: boolean = false;
  id: number = 0;
  slot01: number = 0;
  slot02: number = 0;
  slot03: number = 0;
  slot04: number = 0;
  slot05: number = 0;
  slot06: number = 0;
  slot07: number = 0;
  slot08: number = 0;
  slot09: number = 0;
  slot10: number = 0;
  slot11: number = 0;
  slot12: number = 0;
  slot13: number = 0;
  slot14: number = 0;
  slot15: number = 0;
  slot16: number = 0;

  currentDate: string = '';

  footfallViewResponse = new FootfallViewResponse()

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private sessionService: SessionService,
    private footfallService: FootfallService,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('authToken') === null) {
      this.router.navigateByUrl("/")
    } else {
      if (!this.sessionService.tokenExpired(sessionStorage.getItem('authToken') || '')) {
        this.token = sessionStorage.getItem('authToken') || ''
        this.navbarService.isNavbarVisible = true
        this.isNavbarVisible = this.navbarService.isNavbarVisible
      } else {
        this.router.navigateByUrl("/")
      }
    }

    this.loadDataOnScreenload()
  }

  validateInput(value: any) {
    // Check if the input is numeric and >= 0
    if (isNaN(value) || value < 0) {
      // You can also set a flag or error message here to handle the validation state
      console.log('Invalid input:', value);
    }
  }

  validateInput2(e: any) {

    var data = {
      serviceMessage: {
        type: 'Input Error',
        message: 'Invalid Input Provided'
      }
    }

    const charCode = e.which ? e.which : e.keyCode;
    if (((charCode > 31 && (charCode < 48 || charCode > 57)) || (charCode === 13 || charCode === 8))) {
      this.toast.showToaster(data, ToastTypes.error)
      setTimeout(() => {
        e.target.value = 0
      }, 100)
    }


    // Check if the input is numeric and >= 0
    // if (isNaN(value) || value < 0) {
    //   // You can also set a flag or error message here to handle the validation state
    //   console.log('Invalid input:', value);
    // }
  }

  submitData() {
    this.spinner.show()

    if (this.token !== '' && !this.sessionService.tokenExpired(this.token)) {

      if (!this.id || this.id === 0) {
        this.footfallService.addFootfall(this.getSlotsRequestModel()).subscribe((data: FootfallViewResponse) => {
          this.footfallViewResponse = data
          if (this.footfallViewResponse.serviceMessage.code === 201) {
            this.toast.showToaster(data, ToastTypes.success)
            this.router.navigateByUrl("/home")
          } else {
            this.toast.showToaster(data, ToastTypes.error)
          }
          this.spinner.hide()
        }, error => {
          console.log(error)
          this.spinner.hide()
        })
      }

      if (this.id || this.id > 0) {
        this.footfallService.updateFootfall(this.getSlotsRequestModel(), this.id).subscribe((data: FootfallViewResponse) => {
          this.footfallViewResponse = data
          if (this.footfallViewResponse.serviceMessage.code === 200) {
            this.toast.showToaster(data, ToastTypes.success)
            this.router.navigateByUrl("/home")
          } else {
            this.toast.showToaster(data, ToastTypes.error)
          }
          this.spinner.hide()
        }, error => {
          console.log(error)
          this.spinner.hide()
        })
      }
    }
  }

  getCurrentDateInDDMMMYYYY() {
    let newDate
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.toLocaleString('en-US', { month: 'short' });
    let dd = today.getDate();

    if (dd < 10) {
      newDate = ('0' + dd)
    } else {
      newDate = dd.toString()
    }

    return (newDate + '-' + mm + '-' + yyyy)
  }

  getSlotsRequestModel() {
    return {
      'slot01': this.slot01,
      'slot02': this.slot02,
      'slot03': this.slot03,
      'slot04': this.slot04,
      'slot05': this.slot05,
      'slot06': this.slot06,
      'slot07': this.slot07,
      'slot08': this.slot08,
      'slot09': this.slot09,
      'slot10': this.slot10,
      'slot11': this.slot11,
      'slot12': this.slot12,
      'slot13': this.slot13,
      'slot14': this.slot14,
      'slot15': this.slot15,
      'slot16': this.slot16
    }
  }

  loadDataOnScreenload() {
    this.currentDate = this.getCurrentDateInDDMMMYYYY()
    this.spinner.show()
    let response = this.footfallService.viewFootfall(this.currentDate)
    response.subscribe((data: any) => {
      this.footfallViewResponse = data
      if (this.footfallViewResponse.serviceMessage.code === 200) {
        this.id = this.footfallViewResponse.result.id
        this.slot01 = this.footfallViewResponse.result.slotValue01
        this.slot02 = this.footfallViewResponse.result.slotValue02
        this.slot03 = this.footfallViewResponse.result.slotValue03
        this.slot04 = this.footfallViewResponse.result.slotValue04
        this.slot05 = this.footfallViewResponse.result.slotValue05
        this.slot06 = this.footfallViewResponse.result.slotValue06
        this.slot07 = this.footfallViewResponse.result.slotValue07
        this.slot08 = this.footfallViewResponse.result.slotValue08
        this.slot09 = this.footfallViewResponse.result.slotValue09
        this.slot10 = this.footfallViewResponse.result.slotValue10
        this.slot11 = this.footfallViewResponse.result.slotValue11
        this.slot12 = this.footfallViewResponse.result.slotValue12
        this.slot13 = this.footfallViewResponse.result.slotValue13
        this.slot14 = this.footfallViewResponse.result.slotValue14
        this.slot15 = this.footfallViewResponse.result.slotValue15
        this.slot16 = this.footfallViewResponse.result.slotValue16
        this.spinner.hide()
      } else {
        this.toast.showToaster(data, ToastTypes.info)
        this.spinner.hide()
      }
    }, error => {
      console.log(error)
      this.spinner.hide()
    });
  }
}
