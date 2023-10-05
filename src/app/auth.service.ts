import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private loggedInUser: any;
  private user: any;
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  decodeToken(token: string | null): any {
    if (token) {
      try {
        return jwt_decode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  // Login method

  login(credentials: any): Observable<any> {
    // Assuming you make an HTTP request to authenticate the user
    return this.http.post('http://localhost:3000/api/login', credentials);
  }

  // Set the user information
  setUser(user: any): void {
    this.user = user;
  }

  // Get the user information
  getUser(): any {
    return this.user;
  }

  // Get the username
  getUsername(): string | undefined {
    return this.user ? this.user.username : undefined;
  }

  sendId(userId: any) {
    const url = 'http://localhost:3000/loginUserId';
    return this.http.post(url, { userId });
  }
}
