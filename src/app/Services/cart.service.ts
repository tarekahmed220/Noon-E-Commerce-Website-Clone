import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);

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
}
