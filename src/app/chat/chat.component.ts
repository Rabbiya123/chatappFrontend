import { MessageService } from './../message.service';
import { AgentService } from './../agent.service';
import { Component, OnInit, Input } from '@angular/core';
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
  message1: any;
  // chatId: String[] = [];
  // activeThread: String | null = null;
  online: any[] = [
    {
      value: '',
    },
  ];
  senderid: string = '';
  receiverid: string = '';
  messages: any[] = [
    {
      content: '',
      sender: '',
      receiver: '',
      username: '',
      receiverName: '',
      timer: '',
    },
  ];

  connected: boolean = false;
  userlist: any[] = [];
  loginUser: any;
  selectedUser: any;
  loginuserName: String = '';
  incomingMessage: any;
  jwtToken: string = '';
  decodedToken: any;
  credentials = {
    email: '',
    password: '',
  };
  thread_id: any = `${this.senderid}_${this.receiverid}`;

  // simple Constructor with its three permeters
  constructor(
    private websocketService: WebsocketService,
    private AgentService: AgentService,
    private AuthService: AuthService,
    private MessageService: MessageService
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
  generateRandomChatId() {
    const randomChatId = Math.floor(Math.random() * 100000).toString();

    // this.activeThread = randomChatId;
  }

  //-------Select User from the list-----------
  selectUser(user: any) {
    this.selectedUser = user;
    this.loadMessagesForUser(user._id);
    // console.log('yh h ', user._id);
    this.messages = [];
  }
  loadMessagesForUser(userId: string) {
    this.MessageService.getMessagesForUser(userId).subscribe(
      (messages: any[]) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  //-------------------------------------------

  //-----Send Message to Serve Code -----------
  sendMessage() {
    if (this.selectedUser && this.message1.trim() !== '') {
      console.log('Sender ID:', this.senderid);
      console.log('receiver ID:', this.receiverid);

      const message = {
        sender: this.senderid,
        username: this.loginuserName,
        receiver: this.selectedUser._id,
        receiverName: this.selectedUser.username,
        content: this.message1,
      };
      this.messages.push(message);

      this.websocketService.sendMessage(message);

      this.messages.push(`${this.loginuserName}: ${this.message1}`);

      this.message1 = '';
    }
  }
  //---------------------------------------------------

  //--------Display All user onto Screen---------------

  ngOnInit(): void {
    this.loginUser = this.AuthService.getUsername();
    this.AgentService.getOtherUsers().subscribe(
      (users: any[]) => {
        this.userlist = users;

        // Automatically select the first user when the userlist is loaded
        if (this.userlist.length > 0) {
          this.selectUser(this.userlist[0]);
        }
      },
      (error) => {
        console.error('Error fetching other users:', error);
      }
    );

    // Get Online User Status
    this.websocketService.getOnlineUser().subscribe(
      (onlineuser) => {
        this.online = onlineuser;
        console.log('status of online users', this.online);
      },
      (error) => {
        console.error('error while finding the online user status', error);
      }
    );

    this.websocketService.getMessage().subscribe((message: string) => {
      console.log('Message from server:', message);
      this.messages.push(message);
    });

    //-----------------------------------------------

    //----------Decode Token Code--------------------
    const token = this.AuthService.getToken();
    const decodedToken = this.AuthService.decodeToken(token);

    if (decodedToken) {
      const userId = decodedToken.userId;
      const loginUserName = decodedToken.username;
      this.loginuserName = loginUserName;
      this.senderid = userId;
      // assign the login userId to variable senderId
      console.log('username decoded', loginUserName);
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
