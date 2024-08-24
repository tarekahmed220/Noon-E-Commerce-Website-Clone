import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductService {
  constructor(private http: HttpClient) {}

  toggleFavorite(data: { productId: string }): Observable<any> {
    return this.http.post('http://localhost:4000/togglefavorite', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUserFavorites(): Observable<any> {
    return this.http.get('http://localhost:4000/getUserFavorites');
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:4000/removefromfavorite/${productId}`
    );
  }
  getwishlistcount(): Observable<any> {
    return this.http.get('http://localhost:4000/getwishlistcount');
  }

  
}
