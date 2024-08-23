import { Component, OnInit } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';
import { CommonModule } from '@angular/common';

import { SubSliderComponent } from '../sub-slider/sub-slider.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexCenterDirective, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showLinks: boolean = false;
  isLogin: boolean = false;
  cartCount: number = 0;

  constructor(
    private router: Router,
    private _authServe: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this._authServe.isLogin.subscribe((status) => {
      this.isLogin = status;
      if (this.isLogin) {
        this.fetchCartCount();
      }
    });
  }

  onSignOut() {
    this._authServe.signOut();
    this.router.navigate(['/signin']);
  }

  changeShowLinksStatus() {
    this.showLinks = !this.showLinks;
  }

  private fetchCartCount(): void {
    this.cartService.fetchCartCount().subscribe(
      (count) => this.cartService.updateCartCount(count),
      (error) => console.error('Error fetching cart count:', error)
    );
  }
}
