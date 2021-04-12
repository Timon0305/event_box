import { Component, OnInit, Input } from '@angular/core';
import { youTubeGetID } from '@app/core/utils/common.util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-shared-video-list',
  templateUrl: './shared-video-list.component.html',
  styleUrls: ['./shared-video-list.component.scss']
})
export class SharedVideoListComponent implements OnInit {

  @Input() set videos(value) {
    if (value) {
      this.videoArr = value.filter(res => !!res).map(url => {
        return { url, youtubeId: youTubeGetID(url) };
      });
    }
  }
  videoArr: Array<string> = [];
  constructor(private readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  playVideo(video) {
    const modalRef = this.modalService.open(VideoPopupComponent,  { size: 'lg', centered: true });
    modalRef.componentInstance.videoId = video.youtubeId;
  }
}
