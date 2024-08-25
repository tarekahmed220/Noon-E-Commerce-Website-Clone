import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SubSliderComponent } from '../sub-slider/sub-slider.component';
import { SectionWithSliderComponent } from '../section-with-slider/section-with-slider.component';
import { GetsomeproductsService } from '../../Services/getsomeproducts.service';
import { IProduct, ISomeProducts } from '../../interface/ISomeProduct';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule,
    SubSliderComponent,
    SectionWithSliderComponent,
  ],
  providers: [NgbCarouselConfig],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  recomendedforyou: IProduct[] = [];
  powerbank: IProduct[] = [];
  allMobiles: IProduct[] = [];
  gaming: IProduct[] = [];
  shirts: IProduct[] = [];

  constructor(
    config: NgbCarouselConfig,
    private _getSomeProductsServ: GetsomeproductsService
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/slider7.gif',
  ];
  ngOnInit(): void {
    this._getSomeProductsServ
      .getSomeProducts({ subCategoryName: 'powerbank' })
      .subscribe(
        (response: ISomeProducts) => {
          this.powerbank = response.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    this._getSomeProductsServ
      .getSomeProducts({ subCategoryName: 'allMobiles' })
      .subscribe(
        (response: ISomeProducts) => {
          this.allMobiles = response.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    this._getSomeProductsServ
      .getSomeProducts({ subCategoryName: 'gaming' })
      .subscribe(
        (response: ISomeProducts) => {
          this.gaming = response.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    this._getSomeProductsServ
      .getSomeProducts({ subCategoryName: 'watches' })
      .subscribe(
        (response: ISomeProducts) => {
          this.recomendedforyou = response.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    this._getSomeProductsServ
      .getSomeProducts({ subCategoryName: 'shirts' })
      .subscribe(
        (response: ISomeProducts) => {
          this.shirts = response.products;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
}
