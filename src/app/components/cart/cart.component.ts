import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductCartComponent } from './cart-product/cart-product.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent,FormsModule],
  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[] = [];
  totalItems: number = 0;
  subTotal: number = 0;
  totalPrice: number = 0;
  couponCode: string = ''; // تأكد من تعريف المتغير هنا

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    // اشتراك في تحديثات عدد المنتجات
    this.cartServ.cartCount$.subscribe(count => this.totalItems = count);
    console.log(this.products);


    // اشتراك في تحديثات المنتجات
    this.cartServ.cartProduct$.subscribe(products => {
      this.products = products;
      this.updateCartDetails(); // تحديث تفاصيل السلة عند تحديث المنتجات
    });
  }

  updateCartDetails(): void {
    this.subTotal = this.cartServ.getSubTotal();
    this.applyCoupon()
  }

  applyCoupon(){
    this.totalPrice = this.cartServ.getTotalPriceAfterCoupon(this.couponCode);
  }
}
