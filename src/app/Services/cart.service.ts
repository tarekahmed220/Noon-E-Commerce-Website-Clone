import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProduct } from '../interface/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  private products: any[] = [
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

  constructor(private http: HttpClient) {
    this.fetchCartCount().subscribe(); // Fetch cart count on service initialization
  }

  get cartCount$(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  // وظيفة لإضافة عنصر إلى السلة
  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post('http://localhost:4000/addtocart', {
      productId,
      quantity,
    });
  }

  // جلب عدد العناصر من الخادم وإعادته كـ Observable
  fetchCartCount(): Observable<number> {
    return this.http.get<number>('http://localhost:4000/cart-count').pipe(
      tap((count) => this.updateCartCount(count)) // Update cart count
    );
  }

  // إضافة عنصر إلى السلة وتحديث عدد العناصر
  addProductToCart(productId: string, quantity: number = 1): void {
    this.addToCart(productId, quantity).subscribe(
      () => {
        this.fetchCartCount().subscribe(); // Update cart count after adding
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  removeProduct(productId: string) {
    this.products = this.products.filter(
      (product) => product._id !== productId
    );
  }

  getTotalItems() {
    return this.products.length;
  }

  getSubTotal() {
    return this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  updateProductQuantity(productId: string, quantity: number): void {
    const product = this.products.find((p) => p._id === productId);
    if (product) {
      product.quantity = quantity;
    }
  }
}
