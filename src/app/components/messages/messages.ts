import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../services/messages-service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="messages" *ngIf="messageService.getMessages().length">
      <h2>Messages</h2>
      <button (click)="clear()">Clear</button>
      <div *ngFor="let message of messageService.getMessages()">{{message}}</div>
    </div>
  `,
  styles: [`
    .messages {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background-color: #eee;
      border-top: 1px solid #ccc;
      padding: 10px;
      font-family: monospace;
      max-height: 150px;
      overflow-y: auto;
      z-index: 1000;
    }
  `]
})
export class MessagesComponent {
  constructor(public messageService: MessagesService) {}

  clear() {
    this.messageService.clear();
  }
}

