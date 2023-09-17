// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  // users: any[] = []; // An array to store the list of users
  // searchTerm: string = ''; // A variable to store the search term
  // constructor(private http: HttpClient) {}
  // ngOnInit() {
  //   // Fetch user data from the server
  //   this.http.get<any[]>('http://localhost:3000/api/users').subscribe(
  //     (data) => {
  //       this.users = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }
  // filterUsers() {
  //   if (this.searchTerm) {
  //     this.users = this.users.filter((user) =>
  //       user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   } else {
  //     this.ngOnInit();
  //   }
  // }
}
