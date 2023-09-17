import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  c1 = {
    email: '',
    password: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.http.post('http://localhost:3000/api/login', this.c1).subscribe(
      (response: any) => {
        console.log('Response Email:', response.email);
        console.log('Response Role:', response.role);

        alert('Login Successfully');
        if (response.token && response.email && response.username) {
          console.log('Setting token:', response.token);
          this.authService.setToken(response.token);
          this.router.navigate(['/home'], {
            queryParams: {
              email: response.email,
              role: response.role,
              username: response.username,
            },
          });
        }
      },
      (error) => {
        console.error(error);
        alert('Login Failed');
      }
    );
  }
}
