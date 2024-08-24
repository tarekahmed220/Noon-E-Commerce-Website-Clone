import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AllProductsService } from '../../Services/all-products.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteProductService } from '../../Services/product.service';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { IProduct } from '../../interface/IProduct';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { map } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  subCategoryId!:string
  allSubCategory: any[] = []; // أو استخدم الواجهة المناسبة

  isFavorite: boolean = false;
  isLogin: boolean = false;


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
    this.authService.isLogin.subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });

    this.allProductsServ.getProductsTest().subscribe(items => {
      if (items.length === 0) {
        // إذا كانت القائمة فارغة، احصل على جميع المنتجات
        this.allProductsServ.AllProducts.subscribe(allProducts => {
          if(allProducts){
            this.allProducts = allProducts[0].products;
            console.log('All products loaded:', this.allProducts);
          }
        });
      } else {
        this.allProducts = items;
        console.log('Received products:', this.allProducts);
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


}
