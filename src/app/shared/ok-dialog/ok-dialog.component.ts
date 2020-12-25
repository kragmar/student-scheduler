import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';

@Component({
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.css'],
})
export class OkDialogComponent implements OnInit {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<OkDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.fromPage;
  }

  ngOnInit(): void {}
}
