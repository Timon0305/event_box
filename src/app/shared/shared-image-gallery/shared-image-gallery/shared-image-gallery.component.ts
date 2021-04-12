import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-image-gallery',
  templateUrl: './shared-image-gallery.component.html',
  styleUrls: ['./shared-image-gallery.component.scss']
})
export class SharedImageGalleryComponent implements OnInit {

  @Input() imageArray;
  @Input() defaultImage;
  constructor() { }

  ngOnInit() {
  }

  viewImage(image) {
    this.defaultImage = image;
  }

}
