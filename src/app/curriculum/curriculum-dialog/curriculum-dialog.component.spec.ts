import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDialogComponent } from './curriculum-dialog.component';

describe('CurriculumDialogComponent', () => {
  let component: CurriculumDialogComponent;
  let fixture: ComponentFixture<CurriculumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
