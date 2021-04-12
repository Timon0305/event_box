import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrevenSpecialChar]'
})
export class PrevenSpecialCharDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    return !(/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(event.key));
  }
  constructor(private el: ElementRef) { }
}
