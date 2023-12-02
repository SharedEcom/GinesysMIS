import { Component, OnInit } from '@angular/core';
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
      'slot07': this.slot07
    }
  }

  loadDataOnScreenload() {
    this.spinner.show()
    let response = this.footfallService.viewFootfall(this.getCurrentDateInDDMMMYYYY())
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
