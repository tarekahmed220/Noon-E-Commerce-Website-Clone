import { Component } from '@angular/core';
import { IProduct } from '../../interface/IProduct';
import { CartService } from '../../Services/cart.service';
import { ProductCartComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  productsCart: IProduct[] = [];
  totalItems: number = 0;
  subTotal: number = 0;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.subTotal = this.cartServ.getSubTotal();
    console.log(this.subTotal);

    this.totalItems = this.cartServ.getTotalItems();
  }
}
