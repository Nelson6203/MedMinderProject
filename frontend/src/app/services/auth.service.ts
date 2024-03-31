import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private username: string = '';
  private userId: string = '';

  private URL = 'http://localhost:4000/api' // Backend URL

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

}
