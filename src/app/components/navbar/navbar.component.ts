import { Component } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexCenterDirective, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showLinks: boolean = false;

  changeShowLinksStatus() {
    this.showLinks = !this.showLinks;
  }
}
