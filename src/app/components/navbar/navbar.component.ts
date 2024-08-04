import { Component } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexCenterDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
