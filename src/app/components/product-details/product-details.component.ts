import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../product.service';

interface Product {
  name: string;
  image: string;
  priceBeforeSale: number;
  price: number;
  rate: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Ensure correct modules are imported
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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
}
