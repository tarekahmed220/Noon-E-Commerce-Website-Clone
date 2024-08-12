import { Component, OnInit } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';
import { CommonModule } from '@angular/common';

import { SubSliderComponent } from '../sub-slider/sub-slider.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexCenterDirective, CommonModule, RouterLink],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private _authServe: AuthService) {}
  showLinks: boolean = false;
  isLogin: boolean = false;

  ngOnInit(): void {
    this._authServe.isLogin.subscribe((status) => {
      this.isLogin = status;
    });
  }

  onSignOut() {
    this._authServe.signOut();
    this.router.navigate(['/signin']);
  }

  changeShowLinksStatus() {
    this.showLinks = !this.showLinks;
  }
}
