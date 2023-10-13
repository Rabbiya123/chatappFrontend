import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loginUserName: any;
  constructor(public authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authservice.getToken();
    const decodedToken = this.authservice.decodeToken(token);

    if (decodedToken) {
      const userId = decodedToken.userId;
      this.loginUserName = decodedToken.username;

      // assign the login userId to variable senderId
      console.log('username decoded', this.loginUserName);
      console.log('this is the login user id', userId);
      //simply console
      console.log('Decoded Token:', decodedToken);
      // simply console
    } else {
      console.error('Token not found or decoding failed');
    }
  }
  logout(): void {
    this.authservice.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.authservice.clearToken();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
}
