// Angular and Ionic components
import { Pipe, PipeTransform } from '@angular/core';

// App components
import { Title } from '../../app/title';

@Pipe({
  name: 'titleFilter',
})
export class TitleFilterPipe implements PipeTransform {
  transform(items: Title[], seriesId?: number): Title[] {
    if (!seriesId) {
      return items;
    }

    return items.filter(item => item.seriesId == seriesId);
  }
}
