import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  message: any;
  messages: string[] = [];
  connected: boolean = false;
  constructor(private websocketService: WebsocketService) {
    this.websocketService.connectionStatus().subscribe((status) => {
      this.connected = status;
      console.log('hy', status);
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.websocketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
