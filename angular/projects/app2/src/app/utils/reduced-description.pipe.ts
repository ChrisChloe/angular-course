import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'reducedDescription'
})
export class ReducedDescription implements PipeTransform {
  transform(text: string, truncateIn: number): string {
    if (text.length > 15) {
      return text.substr(0, truncateIn) + '...';
    }
    return text;
  }
}
