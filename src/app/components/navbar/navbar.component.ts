import { Component, OnInit } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';
import { CommonModule } from '@angular/common';

import { SubSliderComponent } from '../sub-slider/sub-slider.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { AllProductsService } from '../../Services/all-products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FlexCenterDirective, CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showLinks: boolean = false;
  isLogin: boolean = false;
  cartCount: number = 0;
  userName: string = 'guest';
  inputValue: string = '';

  constructor(
    private router: Router,
    private _authServe: AuthService,
    private cartService: CartService,
    private _allProductServ: AllProductsService
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
    this._authServe.getUserName().subscribe((response: any) => {
      const theUserName = response.fullName;
      const firstName = theUserName.split(' ')[0];
      this.userName = firstName.toUpperCase();
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
  onSearch() {
    this.router.navigate(['/allProducts']);
    this._allProductServ.changeSearchvalue(this.inputValue);
  }
}
