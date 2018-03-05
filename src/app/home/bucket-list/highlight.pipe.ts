import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args.length === 0) {
      return value;
    }

    return value
      .split(args)
      .join(`<span class="highlight white-text">${args}</span>`);
  }

}
