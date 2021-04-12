import { Directive, ElementRef, AfterContentInit, Input, Renderer2 } from '@angular/core';
import { Constants } from '@app/config/constant';

@Directive({
  selector: '[appPriceContainer]'
})
export class PriceContainerDirective implements AfterContentInit {
  @Input() value;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  ngAfterContentInit() {
    const value = `${this.value}`.split('.')[0];
    if (value && value.length >= Constants.NUMBER.four && value.length <= Constants.NUMBER.five) {
      this.renderer.addClass(this.el.nativeElement, 'small');
    } else if (value.length > Constants.NUMBER.five) {
      this.renderer.addClass(this.el.nativeElement, 'extra-small');
    }
  }

}
