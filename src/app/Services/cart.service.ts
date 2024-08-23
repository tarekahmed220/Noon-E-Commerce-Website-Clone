import { Injectable } from '@angular/core';
import { IProduct } from '../interface/IProduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: BehaviorSubject<IProduct[]> = new BehaviorSubject ([
    {
      id: 1,
      name: 'Samsung Galaxy A15 Dual SIM Light Blue 6GB RAM 128GB 4G LTE - Middle East Version',
      price: "EGP 132.65",
      originalPrice: "EGP 9999.0",
      discount: 17,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '10 h 27 m',
      deliveryDate: 'date',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Apple iPhone 13 Pro Max 256GB',
      price: "EGP 1500.0",
      originalPrice: "EGP 1700.0",
      discount: 12,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '5 h 30 m',
      deliveryDate: 'tomorrow',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Dell XPS 13 Laptop',
      price: "EGP 2000.0",
      originalPrice: "EGP 2200.0",
      discount: 9,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '12 h 45 m',
      deliveryDate: 'in 2 days',
      quantity: 1,
    },
  ]);

  getProducts() : Observable<IProduct[]> {
    return this.products.asObservable();
  }

  private updateProductsFn(products: IProduct[]): void {
    this.products.next(products);
  }

  removeProduct(productId: number) {
    const updatedProducts = this.products.value.filter(product => product.id !== productId);
    this.updateProductsFn(updatedProducts);
  }

  getTotalItems() :number {
    return this.products.value.length;
  }

  getSubTotal(): number {
    return this.products.value.reduce((total, product) => total + parseFloat((product.price).replace(/[^\d.]/g, '')) * product.quantity, 0);
  }
  getTotalPrice(): number{
    return this.getSubTotal() + 10;
  }

  // updateProductQuantity(productId: number, quantity: number): void {
  //   const product = this.products.find(p => p.id === productId);
  //   if (product) {
  //     product.quantity = quantity;
  //   }
  // }

  updateProductQuantity(productId: number, quantity: number): void {
    const products = this.products.value;
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      products[productIndex].quantity = quantity;
      this.updateProductsFn([...products]);
    }
  }
}

