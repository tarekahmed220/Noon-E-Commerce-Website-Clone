import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from '../../interface/IProduct';
import { CartService } from '../../Services/cart.service';
import { ProductCartComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productsCart: IProduct[] = [];
  totalItems: number = 0;
  subTotal: number = 0;
  totalPrice: number = 0;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.cartServ.getProducts().subscribe(products => {
      this.productsCart = products;
      this.updateCartDetails();
    })
  }

  updateCartDetails(): void{
    this.subTotal = this.cartServ.getSubTotal();
    this.totalItems = this.cartServ.getTotalItems();
    this.totalPrice = this.cartServ.getTotalPrice();
  }
}
