import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-slider',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './sub-slider.component.html',
  styleUrl: './sub-slider.component.css',
  providers: [NgbCarouselConfig],
})
export class SubSliderComponent {
  constructor(config2: NgbCarouselConfig) {
    config2.interval = 0;
    config2.wrap = true;
    config2.keyboard = false;
    config2.pauseOnHover = false;
  }
  showLinks: boolean = false;

  subSliderImages = [
    [
      '/images/sub slider/donate.jpg',
      '/images/sub slider/local beauty.jpg',
      '/images/sub slider/installment.jpg',
      '/images/sub slider/summerstore.jpg',
      '/images/sub slider/travel.jpg',
      '/images/sub slider/shop local.jpg',
      '/images/sub slider/bestseller.jpg',
      '/images/sub slider/mensfashion.jpg',
      '/images/sub slider/kids.jpg',
      '/images/sub slider/homeandkitchen.jpg',
      '/images/sub slider/mobiles.jpg',
    ],
    [
      '/images/sub slider/2/1.png',
      '/images/sub slider/2/2.png',
      '/images/sub slider/2/3.png',
      '/images/sub slider/2/4.png',
      '/images/sub slider/2/5.png',
      '/images/sub slider/2/6.png',
      '/images/sub slider/2/7.png',
      '/images/sub slider/2/8.png',
      '/images/sub slider/2/9.png',
      '/images/sub slider/2/10.png',
      '/images/sub slider/2/11.png',
      '/images/sub slider/2/12.png',
    ],
    [
      '/images/sub slider/3/1.png',
      '/images/sub slider/3/2.png',
      '/images/sub slider/3/3.png',
      '/images/sub slider/3/4.png',
      '/images/sub slider/3/5.png',
      '/images/sub slider/3/6.png',
      '/images/sub slider/3/7.png',
      '/images/sub slider/3/8.png',
      '/images/sub slider/3/9.png',
      '/images/sub slider/3/10.png',
      '/images/sub slider/3/11.png',
      '/images/sub slider/3/12.png',
    ],
    [
      '/images/sub slider/4/1.png',
      '/images/sub slider/4/2.png',
      '/images/sub slider/4/3.png',
      '/images/sub slider/4/4.png',
      '/images/sub slider/4/5.png',
      '/images/sub slider/4/6.png',
      '/images/sub slider/4/7.png',
      '/images/sub slider/4/8.png',
      '/images/sub slider/4/9.png',
      '/images/sub slider/4/10.png',
      '/images/sub slider/4/11.png',
      '/images/sub slider/4/12.png',
    ],
  ];
}
