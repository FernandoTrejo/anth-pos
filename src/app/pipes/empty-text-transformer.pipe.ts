import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyTextTransformer'
})
export class EmptyTextTransformerPipe implements PipeTransform {

  transform(text: string, replaceIfEmptyWith : string): string {
    if(text.trim() == ''){
      return replaceIfEmptyWith;
    }

    return text;
  }

}
