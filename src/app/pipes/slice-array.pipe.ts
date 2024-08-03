import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray',
  standalone: true
})
export class SliceArrayPipe implements PipeTransform {

  transform<T>(array: T[], endIndex: number): T[] {
    return array.slice(0, endIndex);
  }

}
