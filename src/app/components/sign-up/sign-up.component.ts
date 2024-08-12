import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private authServ: AuthService, private router: Router) {}

  errorMsg: string = '';

  formElements: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[A-Z][a-z0-9]{7,20}$'),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  get fullName() {
    return this.formElements.get('fullName');
  }
  get email() {
    return this.formElements.get('email');
  }
  get password() {
    return this.formElements.get('password');
  }

  get confirmPass() {
    return this.formElements.get('confirmPassword');
  }

  submitData() {
    const userData = this.formElements.value;

    this.authServ.register(userData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['signin']);
      },
      (error) => {
        this.errorMsg = error.error.message;
        console.error(error.error.message);
      }
    );
  }
}
