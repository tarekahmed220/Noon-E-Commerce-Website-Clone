import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart.component';
import { IProduct } from '../../../interface/IProduct';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CartComponent, FormsModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class ProductCartComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.cartServ.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  removeProduct(productId: string) {
    this.cartServ.removeProduct(productId);
  }

  updateQuantity(product: IProduct, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = parseInt(target.value, 10);
      if (!isNaN(value) && value > 0) {

        this.cartServ.updateProductQuantity(product._id, value);
        product.quantity = value;
        // console.log(value,true);
      } else {
        this.cartServ.updateProductQuantity(product._id, 0);
        product.quantity = 0;

        // this.removeProduct(product.id);
      }
    }
  }

  getPriceAsNumber(price: string): number {
    return parseFloat(price.replace(/[^\d.]/g, ''));
  }

}
