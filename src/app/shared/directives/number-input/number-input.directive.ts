import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective {

  @HostListener('keydown', ['$event']) onKeydownHandler($event: KeyboardEvent) {
    return !(!Number($event.key) && ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf($event.key) < 0 && $event.key !== '0'
    && !$event.ctrlKey);
  }
}
