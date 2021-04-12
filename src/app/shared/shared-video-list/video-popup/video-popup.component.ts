import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss']
})
export class VideoPopupComponent implements OnInit {
  @Input() videoId;
  youtubeUrl;
  constructor(private readonly sanitize: DomSanitizer) { }
  ngOnInit() {
    this.youtubeUrl = this.sanitize.bypassSecurityTrustResourceUrl(`${Constants.YOUTUBE_EMBED_BASE_URL}${this.videoId}?autoplay=1`);
  }

}
