import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventKeys]'
})
export class PreventKeysDirective {
  @Input() controlValue;
  @Input() maxLngth;

  constructor() { }

  @HostListener('keydown', ['$event']) onKeydownHandler($event: KeyboardEvent) {
    return !(this.controlValue > this.maxLngth && $event.key !== 'Backspace');
  }

}
