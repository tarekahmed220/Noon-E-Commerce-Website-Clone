import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signinData: IUser = {} as IUser;
  isLoggedIn: boolean = true;
  onLogin() {
    this.isLoggedIn = !this.isLoggedIn; // Toggles the value of isLoggedIn
  }
}
