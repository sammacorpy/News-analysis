import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autok'
})
export class AutokPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value>=1000000000)
      return (value/1000000000)+"B";
    else if (value>=1000000)
      return (value/1000000)+"M";
    else if(value>=1000)
      return (value/1000)+"k";
    else
      return value;
    return null;
  }

}
