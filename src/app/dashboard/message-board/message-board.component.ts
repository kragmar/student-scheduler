import { MessageService, Message } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.findAll().subscribe((data) => (this.messages = data));
  }

  newMessage(): void {}
}
