import { CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../product.service';
import { IProduct } from '../../interface/IProduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Ensure correct modules are imported
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
    private router: Router
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
  }

  addToCart(product: any) {
    console.log(product);

    // if (!this.isLogin) {
    //   this.router.navigate(['/signin']);
    //   return;
    // }

    this.CartService.addProductToCart(product._id, 1);
  }
}
