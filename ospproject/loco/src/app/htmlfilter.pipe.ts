import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlfilter'
})
export class HtmlfilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/(<([^>]+)>)/ig,"");
    
  }

}
