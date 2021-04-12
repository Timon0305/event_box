import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedVideoListComponent } from './shared-video-list/shared-video-list.component';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [SharedVideoListComponent, VideoPopupComponent],
  imports: [
    CommonModule,
    NgbModule
  ], exports: [SharedVideoListComponent],
  entryComponents: [VideoPopupComponent]
})
export class SharedVideoListModule { }
