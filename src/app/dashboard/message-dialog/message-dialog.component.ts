import { MessageService, Message } from '../../core/services/message.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
  messageForm = this.fb.group({
    title: ['', Validators.required],
    message: ['', Validators.required],
    type: ['', Validators.required],
  });

  message: Message;
  editing = false;

  types: string[] = ['IMPORTANT', 'GENERAL'];

  newMessage: Message = <Message>{};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
    if (receivedData) {
      this.message = receivedData.message;
      this.editing = receivedData.editing;
      if (this.editing) {
        this.updateForm();
      }
    }
  }

  ngOnInit(): void {}

  updateForm(): void {
    this.messageForm.patchValue(this.message);
  }

  onSubmit(): void {
    if (this.messageForm.invalid) {
      return;
    }

    this.newMessage = this.messageForm.value;
    this.newMessage.teacherId = '5f7225de8ee83902f8c3039f';

    if (this.editing) {
      this.newMessage._id = this.message._id;
      this.updateMessage();
    } else {
      this.createMessage();
    }

    this.dialogRef.close('SUCCESS');
  }

  createMessage(): void {
    this.messageService.create(this.newMessage).subscribe();
  }

  updateMessage(): void {
    this.messageService.update(this.newMessage).subscribe();
  }

  deleteMessage(): void {
    this.messageService.delete(this.message).subscribe();
    this.dialogRef.close('DELETION');
  }
}
