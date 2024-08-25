import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductCartComponent } from './cart-product/cart-product.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentService } from '../../Services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent,FormsModule,MatSnackBarModule],

  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalItems: number = 0;
  subTotal: number = 0;
  totalPrice: number = 0;
  couponCode: string = ''; // تأكد من تعريف المتغير هنا

  constructor(
    private cartServ: CartService,
    private snackBar: MatSnackBar,
    private _paymentServ: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartServ.cartCount$.subscribe((count) => (this.totalItems = count));
    console.log(this.products);

    this.cartServ.cartProduct$.subscribe((products) => {
      this.products = products;
      this.updateCartDetails();
    });
  }

  updateCartDetails(): void {
    this.subTotal = this.cartServ.getSubTotal();
    this.applyCoupon()
  }

  applyCoupon(){
    this.totalPrice = this.cartServ.getTotalPriceAfterCoupon(this.couponCode);
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

  checkout() {
    const orderSummary = [
      { totalPrice: this.totalPrice },
      { products: this.products },
      { subTotal: this.subTotal },
      { productLength: this.products.length },
    ];
    this._paymentServ.onOrderChange(orderSummary);
    this.router.navigate(['checkout']);
  }
}
