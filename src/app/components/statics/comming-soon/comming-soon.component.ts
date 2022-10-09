import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/common/navbar/navbar.service';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.css']
})
export class CommingSoonComponent implements OnInit {

  isNavbarVisible: boolean = false;

  constructor(private router: Router, private navbarService: NavbarService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('authToken') === null) {
      this.router.navigateByUrl("/")
    } else {
      this.isNavbarVisible = this.navbarService.isNavbarVisible
    }
  }

}
