import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { ReverseScrollComponent } from './reverse-scroll/reverse-scroll.component';



@NgModule({
  declarations: [InfiniteScrollComponent, ReverseScrollComponent],
  imports: [
    CommonModule
  ], exports: [
    InfiniteScrollComponent,
    ReverseScrollComponent
  ]
})
export class InfiniteScrollModule { }
