import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePhoto',
})
export class ImagePhotoPipe implements PipeTransform {
  transform(path: string): string {
    const URL = 'http://localhost:4000/';

    return `${URL}${path}`;
  }
}
