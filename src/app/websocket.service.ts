import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';
import io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private onlineUserApi = 'http://localhost:3000/onlineUser';
  private socket: any;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      console.log('connected ok');
      this.connected$.next(true);
    });
    this.socket.on('connect_error', (err: any) => {
      console.log('error', err);
      this.connected$.next(false);
    });
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  getMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
        console.log('received ', message);
      });
    });
  }

  getOnlineUser(): Observable<any[]> {
    return this.http.get<any[]>(this.onlineUserApi);
  }

  // Track WebSocket connection status
  connectionStatus() {
    return this.connected$.asObservable();
  }
}
