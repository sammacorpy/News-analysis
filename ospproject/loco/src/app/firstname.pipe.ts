import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname'
})
export class FirstnamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      const s = value.split(' ');
      return s[0]; 
    }
    return null;

  }

}
