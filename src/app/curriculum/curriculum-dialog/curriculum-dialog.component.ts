import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CurriculumService,
  Curriculum,
} from './../../core/services/curriculum.service';
import { Component, OnInit, Optional, Inject } from '@angular/core';

@Component({
  templateUrl: './curriculum-dialog.component.html',
  styleUrls: ['./curriculum-dialog.component.css'],
})
export class CurriculumDialogComponent implements OnInit {
  curriculumForm = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    desc: [''],
    group: ['', Validators.required],
  });

  curriculum: Curriculum;
  editing = false;

  newCurriculum: Curriculum = <Curriculum>{};

  constructor(
    private fb: FormBuilder,
    private curriculumService: CurriculumService,
    public dialogRef: MatDialogRef<CurriculumDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.curriculum = data.curriculum;
      this.editing = data.editing;
      if (this.editing) {
        this.updateForm();
      }
    }
  }

  ngOnInit(): void {}

  updateForm(): void {
    this.curriculumForm.patchValue(this.curriculum);
  }

  onSubmit(): void {
    if (this.curriculumForm.invalid) {
      return;
    }

    this.newCurriculum = this.curriculumForm.value;

    if (this.editing) {
      this.newCurriculum._id = this.curriculum._id;
      this.updateCurriculum();
    } else {
      this.createMaterial();
    }

    this.dialogRef.close('SUCCESS');
  }

  createMaterial(): void {
    this.curriculumService.create(this.newCurriculum).subscribe();
  }

  updateCurriculum(): void {
    this.curriculumService.update(this.newCurriculum).subscribe();
  }

  deleteCurriculum(): void {
    this.curriculumService.delete(this.curriculum).subscribe();
    this.dialogRef.close('DELETION');
  }
}
