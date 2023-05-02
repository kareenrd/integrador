import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  activeMenu = false;
  faUser = faUser;
  faBars = faBars;
  faCloud = faCloud;

  constructor() { }



  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
