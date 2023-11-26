import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session/session.service';
import { NavbarService } from 'src/app/services/common/navbar/navbar.service';

@Component({
  selector: 'app-extra-udf',
  templateUrl: './extra-udf.component.html',
  styleUrls: ['./extra-udf.component.css']
})
export class ExtraUdfComponent implements OnInit {

  constructor(
      private router: Router 
    // private navbarService: NavbarService,
    // private sessionService: SessionService,
  ) { 
  }

  ngOnInit(): void {
    // this.router.navigateByUrl("/")
  }

}
