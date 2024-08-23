import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegusterUser } from '../interface/IUser';
import { ISigninUser } from '../interface/ISignInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  get isLogin(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  signOut() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }

  register(userData: IRegusterUser): Observable<any> {
    return this.http.post('http://localhost:4000/signup', userData);
  }
  signin(userData: ISigninUser): Observable<any> {
    this.loginStatus.next(true);
    return this.http.post('http://localhost:4000/signin', userData);
  }

  sendResetEmail(email: object) {
    return this.http.patch('http://localhost:4000/resetpassword', email);
  }
  resetNewPassword(newPassword: string, token: string) {
    return this.http.post(
      `http://localhost:4000/pressreset-password/${token}`,
      { password: newPassword }
    );
  }

  confirmEmail(token: string) {
    return this.http.get(`http://localhost:4000/verify/${token}`);
  }

  getUserName() {
    return this.http.get(`http://localhost:4000/getusername`);
  }
}
