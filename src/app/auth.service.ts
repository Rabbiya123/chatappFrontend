import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
}
