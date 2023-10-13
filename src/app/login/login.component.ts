import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, HttpInterceptor {
  c1 = {
    email: '',
    password: '',
  };

  token: any;
  decodetoken: any;
  loginUserId: any;
  loginusername: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.error('Error decoding token');
      return null;
    }
  }
  login() {
    if (this.authService.isLoggedIn()) {
      alert('You are already logged in.');
      this.router.navigate(['/home']);
    } else {
      this.authService.login(this.c1).subscribe(
        (response: any) => {
          console.log('Login successful');
          this.authService.setToken(response.token);
          this.router.navigate(['/home'], {
            queryParams: {
              email: response.email,
              role: response.role,
              username: response.username,
            },
          });
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.decodetoken = this.authService.decodeToken(this.token);

    if (this.decodetoken) {
      this.loginUserId = this.decodetoken.userId;
      this.loginusername = this.decodetoken.username;
      console.log('this is login user id', this.loginUserId);
      console.log('this is loginuser name', this.loginusername);
    }
    //   this.authService.sendId(this.loginUserId).subscribe(
    //     (response) => {
    //       console.log('User ID sent successfully');
    //     },
    //     (error) => {
    //       console.error('Error sending user ID', error);
    //     }
    //   );
    // }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
