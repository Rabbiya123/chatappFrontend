import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: any;
  private connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private incomingMessage: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  incomingMessage$: Observable<any> = this.incomingMessage.asObservable();

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

  joinRoom(
    roomId: string,
    senderid: string,
    receiverid: string
  ): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit(
        'joinchat',
        { roomId, senderid, receiverid },
        (response: any) => {
          if (response.success) {
            observer.next(response);
          } else {
            observer.error(response);
          }
        }
      );
    });
  }

  listenForMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('live_message', (message: any) => {
        observer.next(message);
      });
    });
  }

  // Send a live message to the server
  sendMessage(message: any) {
    this.socket.emit('live_message', message);
  }

  // Track WebSocket connection status
  connectionStatus() {
    return this.connected$.asObservable();
  }
}
