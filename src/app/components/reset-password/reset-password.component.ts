import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  success: boolean = false;
  errorMsg: string = '';
  constructor(private _authServ: AuthService) {}
  email: string = '';

  sendResetEmail() {
    this._authServ.sendResetEmail({ email: this.email }).subscribe(
      (response) => {
        this.success = true;
      },
      (error) => {
        console.log(error.error.message);
        this.errorMsg = error.error.message;
      }
    );
  }
}
