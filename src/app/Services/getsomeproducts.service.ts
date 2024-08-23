import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISomeProducts } from '../interface/ISomeProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetsomeproductsService {
  constructor(private http: HttpClient) {}

  getSomeProducts(subCategory: {
    subCategoryName: string;
  }): Observable<ISomeProducts> {
    return this.http.post<ISomeProducts>(
      'http://localhost:4000/getsomeproducts',
      subCategory
    );
  }
}
