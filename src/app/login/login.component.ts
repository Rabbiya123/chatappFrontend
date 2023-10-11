import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  c1 = {
    email: '',
    password: '',
  };

  token: any;
  decodetoken: any;
  loginUserId: any;
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
      this.http.post('http://localhost:3000/api/login', this.c1).subscribe(
        (response: any) => {
          console.log('Response Email:', response.email);
          console.log('Response Role:', response.role);

          alert('Login Successfully');
          if (response.token && response.email && response.username) {
            // console.log('Setting token:', response.token);
            this.authService.setToken(response.token);
            this.router.navigate(['/home'], {
              queryParams: {
                email: response.email,
                role: response.role,
                username: response.username,
              },
            });
          }

          this.authService.login(this.c1).subscribe(
            (response: any) => {
              this.authService.setUser(response);
            },
            (error) => {
              console.error('this is an error', error);
            }
          );
        },
        (error) => {
          console.error(error);
          alert('Login Failed');
        }
      );
    }
  }
  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.decodetoken = this.authService.decodeToken(this.token);

    if (this.decodetoken) {
      this.loginUserId = this.decodetoken.userId;
      console.log('this is login user id', this.loginUserId);
    }
    this.authService.sendId(this.loginUserId).subscribe(
      (response) => {
        console.log('User ID sent successfully');
      },
      (error) => {
        console.error('Error sending user ID', error);
      }
    );
  }
}
