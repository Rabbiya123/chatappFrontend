import { AgentService } from './../agent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth.service';
// import * as jwt_decode from "jwt-decode";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  message: any;
  senderid: string = '';
  receiverid: string = '';
  messages: string[] = [];
  connected: boolean = false;
  userlist: any[] = [];
  loginUser: any;
  selectedUser: any;
  jwtToken: string = '';
  decodedToken: any;

  credentials = {
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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.error('Error decoding token');
      return null;
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    console.log('this is receiver id', user);
    this.messages = [];
  }

  sendMessage() {
    if (this.selectedUser && this.message.trim() !== '') {
      console.log('Sender ID:', this.senderid);
      console.log('receiver ID:', this.receiverid);

      const message = {
        sender: this.senderid,
        receiver: this.selectedUser._id,
        content: this.message,
      };
      console.log('sending message:', message);
      this.websocketService.sendMessage(message);
      this.messages.push(`You: ${this.message}`);
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
    const token = this.AuthService.getToken();
    const decodedToken = this.AuthService.decodeToken(token);

    if (decodedToken) {
      const userId = decodedToken.userId;
      this.senderid = userId;
      console.log('this is the login user id', userId);
      console.log('Decoded Token:', decodedToken);
    } else {
      console.error('Token not found or decoding failed');
    }
  }
}
