import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session/session.service';
import { NavbarService } from 'src/app/services/common/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isNavbarVisible: boolean = false;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    // this.router.navigateByUrl('/promo-signage')
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
  }
}
