import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './curriculum.component';
import { SharedModule } from '../shared/shared.module';
import { CurriculumDialogComponent } from './curriculum-dialog/curriculum-dialog.component';

@NgModule({
  declarations: [CurriculumComponent, CurriculumDialogComponent],
  imports: [CommonModule, SharedModule, CurriculumRoutingModule],
})
export class CurriculumModule {}
