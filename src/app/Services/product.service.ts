import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  toggleFavorite(data: { productId: string }): Observable<any> {
    return this.http.post('http://localhost:4000/togglefavorite', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
