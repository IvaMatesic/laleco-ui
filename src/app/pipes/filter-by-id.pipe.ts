import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById',
  standalone: true
})
export class FilterByIdPipe implements PipeTransform {

  transform(items: any[], id: number): any[] {
    if (!items || !id) {
      return items;
    }
    // Filter the array to only include items with the given id
    return items.filter(item => item.id === id);
  }


}
