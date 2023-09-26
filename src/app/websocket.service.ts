import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, Observer } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: any;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
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

  // Track WebSocket connection status
  connectionStatus() {
    return this.connected$.asObservable();
  }
}
