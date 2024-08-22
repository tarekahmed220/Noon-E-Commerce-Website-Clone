import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'home', component: LandingPageComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'sendemail', component: ResetPasswordComponent }, //for password
      { path: 'pressreset-password/:token', component: NewPasswordComponent }, //for new password
      {path:'productDetails',component:ProductDetailsComponent},
      { path: 'verify/:token', component: ConfirmEmailComponent },
       { path: 'product/:id', component: ProductDetailsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PagenotfoundComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
