import {
  Component, OnInit, Input, ElementRef,
  ViewChild, Output, EventEmitter, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-reverse-scroll',
  templateUrl: './reverse-scroll.component.html'
})
export class ReverseScrollComponent implements OnInit, OnDestroy {

  @Input() options: { root: HTMLElement | null } = { root: null };
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchorRev', { static: true }) anchor: ElementRef<HTMLElement>;
  private observer: IntersectionObserver;
  constructor(private readonly host: ElementRef) { }

  ngOnInit() {
    const options = {
      root: null,
      threshold: 0.8,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      return entry.isIntersecting && this.scrolled.emit();
    }, options);
    this.observer.observe(this.anchor.nativeElement);
  }
  get element() {
    return this.host.nativeElement;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

  }

}

