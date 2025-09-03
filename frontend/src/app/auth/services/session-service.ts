import { Injectable } from '@angular/core';
import { AuthUser } from '../models/AuthUser';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authToken: string | null = null;
  private isAuthenticated = false;

  private readonly TOKEN_KEY = 'token_data';
  private readonly USER_DATA_KEY = 'user_data';
  // private readonly SESSION_EXPIRY_KEY = 's_time_data';
  // private readonly SESSION_DURATION = 5 * 24 * 60 * 60 * 100;

  constructor(private router: Router) {}

  get getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setUserSession(user: User): void {
    if (user.token) {
      const data = {
        name: user.fullname,
        email: user.email,
        token: user.token,
        userId: user.id,
      };
      this.authToken = user.token;
      this.setStorageItem(this.TOKEN_KEY, user.token);
      this.setStorageItem(this.USER_DATA_KEY, JSON.stringify(data));
      //      this.setSessionExpire();
      this.isAuthenticated = true;
    } else {
      console.error('User token is undefined');
      this.isAuthenticated = false;
    }
  }

  private setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  private removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  // private setSessionExpire(): void {
  //   const expiryTime = new Date().getTime() + this.SESSION_DURATION;
  //   sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  // }

  // private checkSessionExpire(): void {
  //   const expiryTime = sessionStorage.getItem(this.SESSION_EXPIRY_KEY);
  //   if (expiryTime) {
  //     const currentTime = new Date().getTime();
  //     if (currentTime >= +expiryTime) {
  //       this.logout();
  //     }
  //   }
  // }

  isLoggedIn(): boolean {
    //    this.checkSessionExpire();
    this.authToken = this.getToken();
    return !!this.authToken;
  }

  getToken(): string | null {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) ||
      localStorage.getItem(this.TOKEN_KEY)
    );
  }

  logout(): void {
    this.removeStorageItem(this.TOKEN_KEY);
    this.removeStorageItem(this.USER_DATA_KEY);
    //    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    this.isAuthenticated = false;
    this.authToken = null;
    this.router.navigate(['/login']);
  }
}
