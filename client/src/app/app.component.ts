import {Component} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SkiRider';

  showProfileMenu: boolean = false;

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }
}
