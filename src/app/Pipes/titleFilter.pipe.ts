import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      if (typeof item.Title === 'string')
        return item.Title.toLowerCase().includes(searchText);

      return String(item.Title).includes(searchText);
    });
  }
}