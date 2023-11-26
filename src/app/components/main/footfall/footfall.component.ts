import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/auth/session/session.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/common/navbar/navbar.service';
import { FootfallService } from 'src/app/services/screen/footfall/footfall.service';
import { FootfallViewResponse } from 'src/app/models/screens/footfall/footfall-view-response';

@Component({
  selector: 'app-footfall',
  templateUrl: './footfall.component.html',
  styleUrls: ['./footfall.component.css']
})
export class FootfallComponent implements OnInit {
  isNavbarVisible: boolean = false;
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
    private footfallService: FootfallService
  ) { }

  ngOnInit(): void {
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

    const formattedToday = newDate + '-' + mm + '-' + yyyy;


    if (sessionStorage.getItem('authToken') === null) {
      this.router.navigateByUrl("/")
    } else {
      if (!this.sessionService.tokenExpired(sessionStorage.getItem('authToken') || '')) {
        this.navbarService.isNavbarVisible = true
        this.isNavbarVisible = this.navbarService.isNavbarVisible
      } else {
        this.router.navigateByUrl("/")
      }
    }
    this.updateCurrentDate();

    let response = this.footfallService.viewFootfall(formattedToday)
    response.subscribe((data: any) => {
      console.log(data)
      // this.footfallViewResponse = data
      // if (this.footfallViewResponse.serviceMessage.code = 200) {
      //   this.slot01 = this.footfallViewResponse.result.slotValue01
      //   this.slot02 = this.footfallViewResponse.result.slotValue02
      //   this.slot03 = this.footfallViewResponse.result.slotValue03
      //   this.slot04 = this.footfallViewResponse.result.slotValue04
      //   this.slot05 = this.footfallViewResponse.result.slotValue05
      //   this.slot06 = this.footfallViewResponse.result.slotValue06
      //   this.slot07 = this.footfallViewResponse.result.slotValue07
      // }
    }, error => {
      console.log(error)
    });
  }
  submitForm() {
    // Handle form submission logic here
    console.log('Form submitted!', this.slot01, this.slot02, this.slot03, this.slot04, this.slot05, this.slot06, this.slot07, this.slot08);

  }
  validateInput(value: any) {
    // Check if the input is numeric and >= 0
    if (isNaN(value) || value < 0) {
      // You can also set a flag or error message here to handle the validation state
      console.log('Invalid input:', value);
    }
  }

  updateCurrentDate() {
    const now = new Date();
    this.currentDate = now.toDateString(); // Adjust the date format as needed
  }

  submitData() {



    this.router.navigateByUrl("/home")
  }
}
