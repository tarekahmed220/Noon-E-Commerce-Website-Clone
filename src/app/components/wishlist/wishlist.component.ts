import { Component, OnInit } from '@angular/core';
import { FavoriteProductService } from '../../Services/product.service';
import { IProduct } from '../../interface/IProduct';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>Hello, {{ name }}!</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class WishlistComponent implements OnInit {
  newWishList: any[] = [];
  products: any[] = [];
  isLogin: boolean = false;
  isModalOpen = false;
  constructor(
    private _productServ: FavoriteProductService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.isLogin.subscribe((state) => {
      this.isLogin = state;
    });

    this._productServ.getUserFavorites().subscribe((response) => {
      this.products = response.favoriteProducts;
    });
  }
  showDetails(product: IProduct) {
    this.router.navigate([`/showDetails/${product._id}`]);
  }
  addToCart(product: IProduct) {
    if (!this.isLogin) {
      this.router.navigate(['/signin']);
      this.showError();

      return;
    }

    this.cartService.addProductToCart(product._id, 1);
    this.showSuccess();
  }
  removeFromWishList(product: IProduct) {
    this._productServ
      .removeFromWishlist(product._id)
      .subscribe((response: any) => {
        this.products = this.products.filter((p) => p._id !== product._id);
        this.showSuccess();
      });
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  saveName(inputvalue: string) {
    this.newWishList.push(inputvalue);
    this.closeModal();
    this.showSuccess();
  }
  showSuccess() {
    this.snackBar.open('تمت العملية بنجاح!', 'إغلاق', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  showError() {
    this.snackBar.open('حدث خطأ ما!', 'إغلاق', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
