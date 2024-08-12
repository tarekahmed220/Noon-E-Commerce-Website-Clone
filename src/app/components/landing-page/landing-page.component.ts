import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SubSliderComponent } from '../sub-slider/sub-slider.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, SubSliderComponent],
  providers: [NgbCarouselConfig],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(config: NgbCarouselConfig) {
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
}
