import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductCartComponent } from './cart-product/cart-product.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent, MatSnackBarModule],
  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalItems: number = 0;
  subTotal: number = 0;
  totalPrice: number = 0;

  constructor(private cartServ: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // اشتراك في تحديثات عدد المنتجات
    this.cartServ.cartCount$.subscribe((count) => (this.totalItems = count));

    // اشتراك في تحديثات المنتجات
    this.cartServ.cartProduct$.subscribe((products) => {
      this.products = products;
      this.updateCartDetails(); // تحديث تفاصيل السلة عند تحديث المنتجات
    });
  }

  updateCartDetails(): void {
    this.subTotal = this.cartServ.getSubTotal();
    this.totalPrice = this.cartServ.getTotalPrice();
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
