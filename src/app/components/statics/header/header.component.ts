import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthToken: boolean = false;
  userObject: any

  constructor(private router: Router, config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authToken') === null && sessionStorage.getItem('userDetails') === null) {
      this.isAuthToken = false
    } else {
      this.isAuthToken = true
      var tempUserObject = sessionStorage.getItem('userDetails')
      if (tempUserObject !== null) {
        this.userObject = JSON.parse(tempUserObject)
      }
      
    }
  }

  logoutUser() {
    if (sessionStorage.getItem('authToken') !== null && sessionStorage.getItem('userDetails') !== null) { 
      sessionStorage.removeItem('authToken') 
      sessionStorage.removeItem('userDetails') 
      this.router.navigateByUrl('/')
      // sessionStorage.clear()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true, scrollable: true });
  }

}
