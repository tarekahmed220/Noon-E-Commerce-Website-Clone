import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../interface/IProduct';
import { ProductsService } from '../../../Services/products.service';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { SubcategoriesService } from '../../../Services/subcategories.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  subCategoryId!:string 


  constructor(public productService: ProductsService ,public subcategoryService:SubcategoriesService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.allProducts = data.products;
      this.productService.allProducts.next(data?.products)  
      this.getAllSubCategories()

      // console.log(this.allProducts);
      // this.filteredProducts = this.allProducts?.filter((product:any) => product?.subCategoryId?._id === this.subCategoryId )
      // console.log(this.filteredProducts);
    });
    // this.productService.filterProducts('66c7d4199c17835629887e3e').subscribe((products)=>{
    //   this.filteredProducts = products
    //   console.log(products);
      
    // })
    
  }

  getAllSubCategories(){
    this.subcategoryService.getAllSubCategories()
  }

  filterProducts(){
      // this.filteredProducts = this.allProducts?.filter((product:any) => product?.subCategoryId?._id === this.subCategoryId )

  }
}
