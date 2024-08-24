// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AllProductsService {

//   private allSubCategory = new BehaviorSubject<[]>([]);

//   api: string = 'http://localhost:4000/getallproduct';
//   allProducts = new BehaviorSubject([]);
//   constructor(public http: HttpClient) {
//     this.fetchAllSubCategory().subscribe();
//   }

//   getAllProducts():Observable<any>{
//     return this.http.get<any>(this.api);
//   }

//   fetchAllSubCategory(): Observable<[]> {
//     return this.http.get<[]>('http://localhost:4000/getallsubcategories').pipe(
//       tap((subCategory) => this.allSubCategory.next(subCategory))
//     );
//   }

//   get allSubCategoryFn(): Observable<[]>{
//     return this.allSubCategory.asObservable();
//   }

// }

//////////////

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AllProductsService {
  private allSubCategory = new BehaviorSubject<[]>([]);
  private productsSubCategory = new BehaviorSubject<[]>([]);

  api: string = 'http://localhost:4000/getallproduct';
  allProducts = new BehaviorSubject([]);

  constructor(public http: HttpClient) {
    this.fetchAllSubCategory().subscribe();
  }

  get AllProducts(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  fetchAllSubCategory(): Observable<[]> {
    return this.http
      .get<[]>('http://localhost:4000/getallsubcategories')
      .pipe(tap((subcategories) => this.allSubCategory.next(subcategories)));
  }

  get allSubCategoryFn(): Observable<[]> {
    return this.allSubCategory.asObservable();
  }

  fetctProductsSubCategory(subCategoryId: any): Observable<[]> {
    return this.http
      .get<[]>(
        `http://localhost:4000/getallproduct/?subCategoryId=${subCategoryId}`
      )
      .pipe(tap((products) => this.productsSubCategory.next(products)));
  }

  get productsSubCategoryFn(): Observable<[]> {
    return this.productsSubCategory.asObservable();
  }

  fetctProductsSubCategoryBySearch(searchItem: any): Observable<[]> {
    return this.http
      .get<[]>(
        `http://localhost:4000/getallproduct/?keyword=${searchItem}`
      )
      .pipe(tap((products) => this.productsSubCategory.next(products)));
  }

  get productsSubCategoryBySearchFn(): Observable<[]> {
    console.log();
    return this.productsSubCategory.asObservable();
  }

  // استخدم BehaviorSubject لتخزين البيانات بحيث يمكن اشتراك عدة مكونات
  private subCategoryProducts = new BehaviorSubject<any[]>([]);

  setProductsTest(products: any[]): void {
    console.log(products);
    this.subCategoryProducts.next(products); // تحديث البيانات في BehaviorSubject
  }

  getProductsTest(): Observable<any[]> {
    return this.subCategoryProducts.asObservable(); // العودة إلى BehaviorSubject كمراقب
  }
}
