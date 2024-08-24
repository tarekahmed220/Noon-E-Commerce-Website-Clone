import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartProductsSubject = new BehaviorSubject<any[]>([]);
  couponsCode: string[] = ["ahmed22","tarek5"];

  constructor(private http: HttpClient) {
    this.fetchCartCount().subscribe(); // Fetch cart count on service initialization
    this.fetchCartProducts().subscribe(); // Fetch cart products on service initialization
  }

  // Return Observable for cart count
  get cartCount$(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  // Return Observable for cart products
  get cartProduct$(): Observable<any[]> {
    return this.cartProductsSubject.asObservable();
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  updateCartProducts(products: any[]): void {
    this.cartProductsSubject.next(products);
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

  // Fetch cart products from the server
  fetchCartProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:4000/getcartitems').pipe(
      tap((products) => this.updateCartProducts(products))
    );
  }

  // إضافة عنصر إلى السلة وتحديث عدد العناصر
  // Add product to cart and update count and products
  addProductToCart(productId: string, quantity: number = 1): void {
    this.addToCart(productId, quantity).subscribe(
      () => {
        this.fetchCartCount().subscribe(); // Update cart count after adding
        this.fetchCartProducts().subscribe(); // Update cart products after adding
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`http://localhost:4000/removefromcart/${productId}`).pipe(
      tap(() => {
        this.fetchCartCount().subscribe();
        this.fetchCartProducts().subscribe();
      })
    );
  }

  // updateProductQuantity(productId: number, quantity: number): void {
  //   const products = this.cartProductsSubject.value;
  //   const productIndex = products.findIndex(p => p.id === productId);
  //   if (productIndex !== -1) {
  //     products[productIndex].quantity = quantity;
  //     console.log(...products);
  //     this.updateCartProducts([...products]);
  //   }
  // }

  updateProductQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(`http://localhost:4000/updatecart`, { productId, quantity }).pipe(
      tap(() => {
        this.fetchCartCount().subscribe();
        this.fetchCartProducts().subscribe();
      })
    );

  }

  getTotalItems(): number {
    return this.cartProductsSubject.value.length;
  }


  getSubTotal(): number {
    return this.cartProductsSubject.value.reduce((total, product) => total + parseFloat(product.productId.price.replace(/[^\d.]/g, '')) * product.quantity, 0);
  }


  getTotalPrice(): number {
    return parseFloat(this.getSubTotal().toFixed(2));
  }

  getTotalPriceAfterCoupon(coupon: string): number{
    switch(coupon){
      case "ahmed22":
        return this.getTotalPrice() - 300;
      case "tarek5":
        return this.getTotalPrice() - 200;
      default:
        console.log("not found coupon");
        return this.getTotalPrice();
    }
  }
}
