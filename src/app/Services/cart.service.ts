import { Injectable } from '@angular/core';
import { IProduct } from '../interface/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Samsung Galaxy A15 Dual SIM Light Blue 6GB RAM 128GB 4G LTE - Middle East Version',
      price: 132.65,
      originalPrice: 9999.0,
      discount: 17,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '10 h 27 m',
      deliveryDate: 'date',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Apple iPhone 13 Pro Max 256GB',
      price: 1500.0,
      originalPrice: 1700.0,
      discount: 12,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '5 h 30 m',
      deliveryDate: 'tomorrow',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Dell XPS 13 Laptop',
      price: 2000.0,
      originalPrice: 2200.0,
      discount: 9,
      imageUrl: '/images/cartImages/1.avif',
      orderTime: '12 h 45 m',
      deliveryDate: 'in 2 days',
      quantity: 1,
    },
  ];

  constructor() {
    console.log(this.products);
  }

  getProducts() :IProduct[] {
    return this.products;
  }


  removeProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  getTotalItems() {
    return this.products.length;
  }

  getSubTotal() {
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  updateProductQuantity(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.quantity = quantity;
    }
  }
}
