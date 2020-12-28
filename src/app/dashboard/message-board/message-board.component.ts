import { NewMessageDialogComponent } from './../new-message-dialog/new-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService, Message } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent implements OnInit {
  messages: Message[];

  constructor(
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.messageService.findAll().subscribe((data) => (this.messages = data));
  }

  openNewMessageDialog(): void {
    const dialogRef = this.dialog.open(NewMessageDialogComponent, {
      width: 'fit-content',
    });
  }
}
