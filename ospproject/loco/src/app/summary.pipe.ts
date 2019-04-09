import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: any, length?: number): any {
    let ret;
    if (!length) {
      length = 50;

    }

    if (value  && value.length > length) {
      ret = value.substring(0, length);
      ret = ret + '...';
      return ret;
    }
    return value;
  }

}
