import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FavoriteProductService } from '../../Services/product.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { IProduct } from '../../interface/ISomeProduct';
import { CartService } from '../../Services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-section-with-slider',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, MatSnackBarModule],
  templateUrl: './section-with-slider.component.html',
  styleUrls: ['./section-with-slider.component.css'],
  providers: [NgbCarouselConfig],
})
export class SectionWithSliderComponent implements OnChanges, OnInit {
  groupedProducts: any[][] = [];
  isFavorite: boolean = false;
  isLogin: boolean = false;

  constructor(
    config2: NgbCarouselConfig,
    private productService: FavoriteProductService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    config2.interval = 0;
    config2.wrap = true;
    config2.keyboard = false;
    config2.pauseOnHover = false;
  }

  @Input() data: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.groupProducts();
    }
  }

  ngOnInit(): void {
    this.authService.isLogin.subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });
  }

  private groupProducts(): void {
    const numberOfItemsPerSlide = 6;
    this.groupedProducts = [];
    for (let i = 0; i < this.data.length; i += numberOfItemsPerSlide) {
      this.groupedProducts.push(this.data.slice(i, i + numberOfItemsPerSlide));
    }
  }

  toggleFavorite(product: IProduct) {
    if (!this.isLogin) {
      this.router.navigate(['/signin']);
      this.showError();
      return;
    }

    this.productService.toggleFavorite({ productId: product._id }).subscribe(
      () => {
        product.isFavorite = !product.isFavorite;
        this.showSuccess();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  addToCart(product: IProduct) {
    if (!this.isLogin) {
      this.showError();
      this.router.navigate(['/signin']);
      return;
    }
    this.showSuccess();

    this.cartService.addProductToCart(product._id, 1);
  }
  showDetails(product: IProduct) {
    this.router.navigate([`/showDetails/${product._id}`]);
  }
  showSuccess() {
    this.snackBar.open('تمت العملية بنجاح!', 'إغلاق', {
      duration: 3000, // مدة العرض بالمللي ثانية
      panelClass: ['success-snackbar'], // يمكنك تخصيص النمط باستخدام CSS
    });
  }

  showError() {
    this.snackBar.open('من فضلك سجل دخول اولا⚠️ا', 'إغلاق', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
