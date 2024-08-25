import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgxPayPalModule } from 'ngx-paypal';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxPayPalModule,
    RouterOutlet,
    NavbarComponent,
    SignInComponent,
    FooterComponent,
    SignUpComponent,
    ProductDetailsComponent,
    LayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'noon-clone';
}
