import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isNullOrEmpty'
})
export class IsNullOrEmptyPipe implements PipeTransform {
  transform(value: string | null | undefined, substitute: string): string {
    if (!value || value.length < 1) {
      return substitute;
    }
    return value;
  }
}
