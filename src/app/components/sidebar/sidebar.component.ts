import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../../Services/all-products.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  allProducts: any;
  allSubCategory: any[] = []; // يمكنك استخدام واجهة أكثر دقة
  subCategoryId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  allPorductsSubCategory: any[] = [];

  constructor(private allProductsServ: AllProductsService) {}

  ngOnInit(): void {
    this.allProductsServ.allSubCategoryFn
      .pipe(map((sub: Record<string, any>) => sub['subcategories']))
      .subscribe((items) => {
        this.allSubCategory = items;
        console.log(this.allSubCategory);
      });

    // اشتراك في التغييرات على subCategoryId$ لاستخراج المنتجات الجديدة
    this.subCategoryId$.subscribe((subCategoryId) => {
      this.allProductsServ
        .fetctProductsSubCategory(subCategoryId)
        .pipe(
          map((sub: Record<string, any>) => sub['products'] || []) // استخدام Record<string, any>
        )
        .subscribe((items) => {
          this.allPorductsSubCategory = items;
          this.allProductsServ.setProductsTest(this.allPorductsSubCategory);
          console.log(this.allPorductsSubCategory); // سجل البيانات بعد التحديث
        });
    });

    this.allProducts = this.allProductsServ.getProductsTest();
  }

  onCheckboxChange(event: Event, subCategoryId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked; // التحقق من حالة الـ checkbox
    if (isChecked) {
      this.subCategoryId$.next(subCategoryId); // تحديث BehaviorSubject لتغيير subCategoryId
    } else {
      this.allPorductsSubCategory = [];
      this.allProductsServ.setProductsTest(this.allPorductsSubCategory); // تأكد من تحديث BehaviorSubject هنا أيضًا
    }
  }

  trackById(index: number, item: any) {
    return item._id; // استخدم الخاصية الفريدة من الفئة
  }
}
