import { Component } from '@angular/core';
import { CartProductComponent } from "./cart-product/cart-product.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
