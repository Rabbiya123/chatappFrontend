import { AgentService } from './../agent.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { AuthService } from '../auth.service';
import { Socket } from 'socket.io-client';
import jwt_decode from 'jwt-decode';
import { response } from 'express';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  // Variable declaration
  message: any;
  senderid: string = '';
  receiverid: string = '';
  messages: string[] = [];
  connected: boolean = false;
  userlist: any[] = [];
  loginUser: any;
  selectedUser: any;
  incomingMessage: any;
  jwtToken: string = '';
  decodedToken: any;
  credentials = {
    email: '',
    password: '',
  };

  // simple Constructor with its three permeters
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
  //------------------------------------------

  //Decode token method its call from service-

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.error('Error decoding token');
      return null;
    }
  }
  //-------------------------------------------

  //-------Select User from the list-----------
  selectUser(user: any) {
    this.selectedUser = user;

    console.log('selecteduser', this.selectedUser);
    console.log('this is receiver id', user);
    this.messages = [];
  }

  //-------------------------------------------

  //-----Send Message to Serve Code -----------
  sendMessage() {
    if (this.selectedUser && this.message.trim() !== '') {
      console.log('Sender ID:', this.senderid);
      console.log('receiver ID:', this.receiverid);

      const message = {
        sender: this.senderid,
        receiver: this.selectedUser._id,
        content: this.message,
      };

      console.log('Message Send', message);
      // simply console

      this.websocketService.sendMessage(message);
      // its send a message to sever side

      this.messages.push(`You: ${this.message}`);
      // its display the message client side screen
      this.message = '';
    }
  }

  //---------------------------------------------------

  //--------Display All user onto Screen---------------

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

    this.websocketService.getMessage().subscribe((message: string) => {
      console.log('Message from server:', message);
      this.messages.push(message);
    });

    //-----------------------------------------------

    //----------------------------------------------

    //----------Decode Token Code--------------------
    const token = this.AuthService.getToken();
    const decodedToken = this.AuthService.decodeToken(token);

    if (decodedToken) {
      const userId = decodedToken.userId;
      this.senderid = userId;
      // assign the login userId to variable senderId

      console.log('this is the login user id', userId);
      //simply console
      console.log('Decoded Token:', decodedToken);
      // simply console
    } else {
      console.error('Token not found or decoding failed');
    }
  }
  // ------------------------------------------------
}
