// chat-interface.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css'],
})
export class ChatInterfaceComponent {
  // roomName: string = ''; // Variable to store the current chat room name
  // message: string = ''; // Variable to store the current message
  // messages: string[] = []; // An array to store chat messages
  // chatBoxes: { [userId: string]: boolean } = {}; // An object to track open chat boxes
  // constructor(private chatService: ChatService) {}
  // ngOnInit() {
  //   // Join a chat room when the component initializes (you'll need to set the roomName)
  //   this.chatService.joinChatRoom();
  //   // Listen for incoming chat messages
  //   this.chatService.onMessageReceived((message) => {
  //     this.messages.push(message);
  //   });
  // }
  // ngOnDestroy() {
  //   // Disconnect from the chat room when the component is destroyed
  //   this.chatService.disconnect();
  // }
  // // Function to send a chat message
  // sendMessage() {
  //   if (this.message.trim() !== '') {
  //     // Send the message to the chat room
  //     this.chatService.sendMessage(this.roomName, this.message);
  //     // Clear the message input field
  //     this.message = '';
  //   }
  // }
  // // Function to toggle chat box for a user
  // openChatBox(userId: string) {
  //   this.chatBoxes[userId] = !this.chatBoxes[userId];
  // }
}
