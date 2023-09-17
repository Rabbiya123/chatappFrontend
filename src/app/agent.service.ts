import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = 'http://localhost:3000/api/agents';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
