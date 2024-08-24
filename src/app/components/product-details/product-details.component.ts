import { CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../product.service';
import { IProduct } from '../../interface/IProduct';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, MatSnackBarModule], // Ensure correct modules are imported
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isFavorite: boolean = false;
  isLogin: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private CartService: CartService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
          console.log('Product Data:', data); // Log the fetched data
        },
        (error) => {
          console.error('Error fetching product data', error);
        }
      );
    }
    this.authService.isLogin.subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });
  }

  addToCart(product: any) {
    if (!this.isLogin) {
      this.router.navigate(['/signin']);
      this.showError();
      return;
    }

    this.CartService.addProductToCart(product._id, 1);
    this.showSuccess();
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
