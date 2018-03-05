import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: string[], args?: string): string[] {

    return value.filter((bucketName) => bucketName.indexOf(args) !== -1);
  }

}
