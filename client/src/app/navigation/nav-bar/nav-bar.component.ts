import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  showProfileMenu: boolean = false;

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }
  ngOnInit(): void {
  }

}
