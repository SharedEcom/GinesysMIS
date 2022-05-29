import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthToken: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') === null) {
      this.isAuthToken = false
    } else {
      this.isAuthToken = true
    }
  }

  logoutUser() {
    if (localStorage.getItem('authToken') !== null) { 
      localStorage.removeItem('authToken') 
      this.router.navigateByUrl('/')
      // localStorage.clear()
    }
  }

}
