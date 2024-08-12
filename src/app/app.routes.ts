import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];
