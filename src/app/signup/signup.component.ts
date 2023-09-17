import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    role: '',
  };

  errorMessage: string = ''; // Add this property to store error message

  constructor(private http: HttpClient) {}

  signup() {
    this.errorMessage = '';
    this.http.post('http://localhost:3000/api/signup', this.user).subscribe(
      (response) => {
        console.log(response);
        // Handle success, maybe show a success message
        alert('You are Successfully Signup');
      },
      (error) => {
        console.error(error);
        // Handle error, show an error message
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An error occurred during signup.';
        }
      }
    );
  }
}
