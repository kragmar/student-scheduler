import {
  Curriculum,
  CurriculumService,
} from './../core/services/curriculum.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'curriculum-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent implements OnInit {
  curriculums: Curriculum[];

  columns: string[] = ['title', 'subtitle', 'desc', 'group'];

  constructor(private curriculumService: CurriculumService) {}

  ngOnInit(): void {
    this.curriculumService
      .findAll()
      .subscribe((data) => (this.curriculums = data));
  }
}
