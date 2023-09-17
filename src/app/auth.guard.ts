import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log('AuthGuard canActivate is triggered');
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      console.log('AuthGuard redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
