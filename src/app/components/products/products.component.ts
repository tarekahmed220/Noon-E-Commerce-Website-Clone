import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllProductsService } from '../../Services/all-products.service';
import {
  NgbCarouselConfig,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FavoriteProductService } from '../../Services/product.service';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { IProduct } from '../../interface/IProduct';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NgbPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  subCategoryId!: string;
  allSubCategory: any[] = [];
  currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  page: number = 1;
  totalItems = 200;
  itemsPerPage = 15;
  isFavorite: boolean = false;
  isLogin: boolean = false;
  receivedData: string = '';

  constructor(
    config2: NgbCarouselConfig,
    private productService: FavoriteProductService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    public allProductsServ: AllProductsService
  ) {
    config2.interval = 0;
    config2.wrap = true;
    config2.keyboard = false;
    config2.pauseOnHover = false;
  }

  ngOnInit(): void {
    // search
    this.allProductsServ.currentSearchValue.subscribe((data) => {
      this.receivedData = data;
      this.allProductsServ
        .fetctProductsSubCategoryBySearch(this.receivedData)
        .subscribe((response: any) => {
          console.log('data from search', response);
          this.allProducts = response.products;
          this.totalItems = response.total;
        });
    });

    this.authService.isLogin.subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });

    this.currentPage.subscribe((newPage) => {
      console.log(newPage);
      this.allProductsServ
        .fetctProductsByPagination(newPage)
        .subscribe((response) => {
          this.totalItems = response.total;
          this.allProducts = response.products;
        });
    });

    this.allProductsServ.getProductsTest().subscribe((items) => {
      if (items.length === 0) {
        // إذا كانت القائمة فارغة، احصل على جميع المنتجات
        this.allProductsServ.AllProducts.subscribe((allProducts) => {
          if (allProducts) {
            this.allProducts = allProducts[0].products;
          }
        });
      } else {
        this.allProducts = items;
      }
    });
  }

  toggleFavorite(product: any) {
    console.log(this.isLogin);
    if (!this.isLogin) {
      this.router.navigate(['/signin']);
      return;
    }

    this.productService.toggleFavorite({ productId: product._id }).subscribe(
      () => {
        product.isFavorite = !product.isFavorite;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  addToCart(product: IProduct) {
    if (!this.isLogin) {
      this.router.navigate(['/signin']);
      return;
    }

    this.cartService.addProductToCart(product._id, 1);
  }
  showDetails(product: IProduct) {
    this.router.navigate([`/showDetails/${product._id}`]);
  }

  onPageChange(page: number) {
    this.currentPage.next(page);
  }
}
