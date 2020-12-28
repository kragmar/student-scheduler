import { MessageService, Message } from './../../core/services/message.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.css'],
})
export class NewMessageDialogComponent implements OnInit {
  messageForm = this.fb.group({
    title: ['', Validators.required],
    message: ['', Validators.required],
    type: ['', Validators.required],
  });

  newMessage: Message = <Message>{};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<NewMessageDialogComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.messageForm.invalid) {
      return;
    }

    this.newMessage = this.messageForm.value;
    this.createMessage();

    this.dialogRef.close();
  }

  createMessage(): void {
    this.messageService.create(this.newMessage);
  }
}
