import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noPrefix'
})
export class NoPrefixPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
