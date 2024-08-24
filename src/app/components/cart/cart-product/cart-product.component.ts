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

export class ProductCartComponent implements OnInit{

  products: any;
  showToast:boolean = false;
  constructor(private cartServ: CartService){}


  ngOnInit(): void {
    this.cartServ.cartProduct$.subscribe(products => {
      this.products = products;
      console.log(products);
    })
    console.log(this.showToast);

  }


  removeProduct(productId: number): void {
    console.log(productId);
    this.cartServ.removeFromCart(productId.toString()).subscribe(
      () => {
        console.log('Product removed successfully');
      },
      (error) => {
        console.error('Error removing product from cart:', error);
      }
    );

    this.showToast = true;

    setTimeout(()=>{
      this.showToast = false;
      console.log(this.showToast);
    },3000);

    console.log(this.showToast);

  }

  // updateQuantity(product: any, event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   if (target) {
  //     const value = parseInt(target.value, 10);
  //     if (!isNaN(value) && value > 0) {
  //       this.cartServ.updateProductQuantity(product.id, value);
  //       product.quantity = value;
  //       console.log(product);
  //       console.log(product._id);
  //     } else {
  //       this.cartServ.updateProductQuantity(product.id, 0);
  //       this.removeProduct(product.id);
  //     }
  //   }
  // }

  updateQuantity(product: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = parseInt(target.value, 10);
      if (!isNaN(value) && value > 0) {

        this.cartServ.updateProductQuantity(product._id, value).subscribe(
          () => {
            product.quantity = value;
          },
          (error) => {
            console.error('Error updating product quantity:', error);
          }
        );
      } else if(!isNaN(value) && value === 0){
        this.cartServ.updateProductQuantity(product._id, 0).subscribe(
          () => {
            this.removeProduct(product._id);
          },
          (error) => {
            console.error('Error updating product quantity:', error);
          }
        );

      }
    }
  }

  getPriceAsNumber(price: string): number {
    return parseFloat(price.replace(/[^\d.]/g, ''));
  }
  calculateDiscount(price: string, priceBeforeSale: string): number {
    const currentPrice = this.getPriceAsNumber(price);
    const originalPrice = this.getPriceAsNumber(priceBeforeSale);

    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.ceil(discount);
  }


}
////////////////////////////


