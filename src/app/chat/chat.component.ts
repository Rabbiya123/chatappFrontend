import { AgentService } from './../agent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth.service';
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
    // Define the credentials object
    email: '',
    password: '',
  };
  constructor(
    // this.jwtToken = localStorage.getItem('token');
    // this.decodedToken = this.jwtToken ? jwt_decode(this.jwtToken) : null;
    // this.receiverid = this.decodedToken ? this.decodedToken.userId : null;

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
    if (this.selectedUser && this.message.trim() !== '') {
      const message = {
        sender: this.senderid,
        receiver: this.receiverid,
        content: this.message,
      };

      this.websocketService.sendMessage(message);
      this.messages.push(`You: ${this.message}`);
      this.message = '';
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.receiverid = user.id;
    console.log('This is user', user);
    this.messages = [];
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
