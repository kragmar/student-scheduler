import { OkDialogComponent } from './../shared/components/ok-dialog/ok-dialog.component';
import { CurriculumDialogComponent } from './curriculum-dialog/curriculum-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Curriculum,
  CurriculumService,
} from './../core/services/curriculum.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'curriculum-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
})
export class CurriculumComponent implements OnInit, AfterViewInit {
  curriculums: Curriculum[];
  editing = false;

  dataSource = new MatTableDataSource<Curriculum>();
  displayedColumns: string[] = ['title', 'subtitle', 'desc', 'group'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private curriculumService: CurriculumService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.curriculumService.findAll().subscribe((data) => {
      this.dataSource.data = data as Curriculum[];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCurriculumDialog(curriculum?: Curriculum): void {
    const dialogRef = this.dialog.open(CurriculumDialogComponent, {
      width: 'fit-content',
      data: { curriculum: curriculum, editing: this.editing },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let msg;

      if (result === 'SUCCESS') {
        if (this.editing) {
          msg = 'Tananyag frissítve!';
        } else {
          msg = 'Új tananyag létrehozva!';
        }
      } else if (result === 'DELETION') {
        msg = 'Tananyag törölve!';
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
  }
}
