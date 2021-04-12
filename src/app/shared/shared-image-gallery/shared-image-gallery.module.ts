import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedImageGalleryComponent } from './shared-image-gallery/shared-image-gallery.component';



@NgModule({
  declarations: [SharedImageGalleryComponent],
  imports: [
    CommonModule
  ], exports: [SharedImageGalleryComponent]
})
export class SharedImageGalleryModule { }
