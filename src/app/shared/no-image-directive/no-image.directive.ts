import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { Constants } from '@app/config/constant';

@Directive({
  selector: '[appNoImage]'
})
export class NoImageDirective implements AfterViewInit {
  @HostListener('error') onError() {
    this.el.nativeElement.src = Constants.DEFAULT_IMAGE;
  }

  constructor(private readonly el: ElementRef) {
  }

  ngAfterViewInit() {
    if (!this.el.nativeElement.src) {
      this.el.nativeElement.src = Constants.DEFAULT_IMAGE;
    }
  }

}
