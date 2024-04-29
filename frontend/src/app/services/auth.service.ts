import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private username: string = '';
  private userId: string = '';

  private URL = environment.BURL;

  constructor(private httpClient: HttpClient) {}

  login(user: User) {
    return this.httpClient.post<any>(`${this.URL}/login`, user);
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }

}
