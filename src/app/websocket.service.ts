import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  // Send a message to the server
  sendMessage(message: any) {
    const { content, senderid, receiverid } = message;
    this.socket.emit('live_message', { content, senderid, receiverid });
  }

  // Track WebSocket connection status
  connectionStatus() {
    return this.connected$.asObservable();
  }
}
