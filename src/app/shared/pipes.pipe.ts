import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  transform(value: boolean): string {
    return value === true ? "active" : "not active";
  }

}

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (!args) return value;
    if (args) {
      const re = new RegExp(args, 'igm');
      value = value.replace(re, '<span class="highlighted-text">$&</span>');
    }
    return value;
  }

}

@Pipe({
  name: 'slicetext'
})
export class SliceTextPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (args === 'short' && value.length > 26) {
      return `${value.slice(0, 25)}...`
    }
    if (args === 'long' && value.length > 46) {
      return `${value.slice(0, 45)}...`
    }
    return value
  }

}

@Pipe({
  name: 'tel'
})
export class TelPipe implements PipeTransform {

  transform(value: string): string {
    return `+7${value}`
  }

}
