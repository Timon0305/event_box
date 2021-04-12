import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options: { root: HTMLElement | null } = { root: null };
  @Input() isReverse = true;
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;
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

