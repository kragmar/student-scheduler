import { CurriculumService } from './../core/services/curriculum.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'curriculumTitle',
})
export class CurriculumTitlePipe implements PipeTransform {
  constructor(private curriculumService: CurriculumService) {}

  transform(curriculumId: string): string {
    if (!this.curriculumService.cachedCurriculums) {
      return 'ERROR';
    }

    let curriculums = [];

    this.curriculumService.findAll().subscribe((data) => (curriculums = data));

    return curriculums.find((curriculum) => curriculum._id === curriculumId)
      ? curriculums.find((curriculum) => curriculum._id === curriculumId).title
      : 'NOT FOUND';
  }
}
