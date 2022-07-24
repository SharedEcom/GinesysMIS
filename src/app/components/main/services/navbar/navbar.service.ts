import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  isNavbarVisible: boolean = false;

  constructor() { }

  showNavbar() {
    this.isNavbarVisible = true;
  }

  hideNavbar() {
    this.isNavbarVisible = false;
  }

}
