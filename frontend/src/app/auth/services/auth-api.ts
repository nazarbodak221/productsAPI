import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from '../models/AuthUser';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  baseApiUrl: string = 'http://localhost:3000/api/auth';
  apiUrlUserRegister: string = '/register';
  apiUrlUserLogin: string = '/login';

  constructor(private http: HttpClient) {}

  createUser(user: AuthUser): Observable<User> {
    return this.http.post<User>(
      this.baseApiUrl + this.apiUrlUserRegister,
      user
    );
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + this.apiUrlUserLogin, user);
  }
}
