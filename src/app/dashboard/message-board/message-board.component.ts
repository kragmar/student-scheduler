import { OkDialogComponent } from './../../shared/components/ok-dialog/ok-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
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
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.findAll().subscribe((data) => (this.messages = data));
  }

  openMessageDialog(message?: Message, editing?: boolean): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: 'fit-content',
      data: { message: message, editing: editing },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let msg;

      if (result === 'SUCCESS') {
        if (editing) {
          msg = 'Üzenet frissítve!';
        } else {
          msg = 'Új üzenet létrehozva!';
        }
      } else if (result === 'DELETION') {
        msg = 'Üzenet törölve!';
      } else {
        return;
      }

      this.openOkDialog(msg);
    });
  }

  openOkDialog(message: string): void {
    const dialogRef = this.dialog.open(OkDialogComponent, {
      width: 'fit-content',
      data: { message: message },
      panelClass: 'ok-dialog',
    });
    dialogRef.afterClosed().subscribe(() => this.getMessages());
  }
}
