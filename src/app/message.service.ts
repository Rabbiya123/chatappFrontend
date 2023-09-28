import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  // message.service.ts

  getMessagesForUser(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/user/${userId}`; // Remove "messages" from the URL
    return this.http.get<any[]>(url);
  }
}
