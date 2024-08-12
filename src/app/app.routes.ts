import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [{ path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent }
];
