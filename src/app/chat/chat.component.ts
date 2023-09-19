import { AgentService } from './../agent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  message: any;
  senderid: any;
  receiverid: any;
  messages: string[] = [];
  connected: boolean = false;
  userlist: any[] = [];
  loginUser: any;
  credentials = {
    // Define the credentials object
    email: '',
    password: '',
  };
  constructor(
    private websocketService: WebsocketService,
    private AgentService: AgentService,
    private AuthService: AuthService
  ) {
    this.websocketService.connectionStatus().subscribe((status) => {
      this.connected = status;
      console.log('hy', status);
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.websocketService.sendMessage({
        content: this.message,
        sender: this.senderid,
        receiver: this.receiverid,
      });
      this.message = '';
    }
  }

  ngOnInit(): void {
    this.loginUser = this.AuthService.getUsername();

    this.AgentService.getOtherUsers().subscribe(
      (users: any[]) => {
        this.userlist = users;
      },
      (error) => {
        console.error('Error fetching other users:', error);
      }
    );
  }
}
