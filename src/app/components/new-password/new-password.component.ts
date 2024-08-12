import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  constructor(private _authServ: AuthService, private router: ActivatedRoute) {}
  errorMsg: string = '';
  successMsg: string = '';
  newPassword: string = '';
  token: string = '';

  onSubmit() {
    this.token = this.router.snapshot.paramMap.get('token') as string;
    console.log(this.newPassword);
    this._authServ.resetNewPassword(this.newPassword, this.token).subscribe(
      (response: any) => {
        console.log(response);
        this.successMsg = response.message;
      },
      (error) => {
        console.log(error);
        this.errorMsg = error.error.message;
      }
    );
  }
}
