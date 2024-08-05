import { Component } from '@angular/core';
import { FlexCenterDirective } from '../../CutomeDirectives/flex-center.directive';
import { CommonModule } from '@angular/common';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SubSliderComponent } from '../sub-slider/sub-slider.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FlexCenterDirective,
    CommonModule,
    NgbCarouselModule,
    SubSliderComponent,
  ],
  providers: [NgbCarouselConfig],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  showLinks: boolean = false;
  images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/slider7.gif',
  ];

  changeShowLinksStatus() {
    this.showLinks = !this.showLinks;
  }
}
