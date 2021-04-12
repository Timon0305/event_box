import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalizeInput]'
})
export class CapitalizeInputDirective {
  @Input() control: FormControl;
  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    this.control.setValue(this.el.nativeElement.value);
  }
  constructor(private readonly el: ElementRef) {
  }

}
