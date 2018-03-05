import { Pipe, PipeTransform } from '@angular/core';
import { Object } from '../object.model';

@Pipe({
  name: 'orderByFolders'
})
export class OrderByFoldersPipe implements PipeTransform {

  private isFolder(object: Object) {
    return object.s3ObjectSummary.size === 0 && object.s3ObjectSummary.key.endsWith('/');
  }

  transform(value: Object[], args?: any): any {
    return value.sort((a, b) => {
      if (this.isFolder(a) && !this.isFolder(b)) {
        return -1;
      } else if (!this.isFolder(a) && this.isFolder(b)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
