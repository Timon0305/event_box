import { Component, OnInit, Input } from '@angular/core';
import { trackByObjectId } from '@app/core/utils/common.util';
import { Constants } from '@app/config/constant';
@Component({
  selector: 'app-shared-slide-carousel',
  templateUrl: './shared-slide-carousel.component.html',
  styleUrls: ['./shared-slide-carousel.component.scss']
})
export class SharedSlideCarouselComponent implements OnInit {
  currentIndex = 0;
  trackByObjectId = trackByObjectId;
  noOfItemView = Constants.NUMBER.two;
  pages = Constants.PAGES;
  @Input() referrer;
  @Input() set setLocations(locations) {
    if (locations && locations.length) {
      this.locationsData = locations;
      if (window.innerWidth < Constants.RESPONSIVE_WINDOW_MIN_WIDTH.INNERWIDTH) {
        this.noOfItemView = Constants.NUMBER.one;
      } else {
        this.displayNoOfBlock();
      }
      this.dataToLsit = [...this.locationsData].splice(this.currentIndex, this.noOfItemView);
    }
  }
  locationsData;
  dataToLsit;
  constructor() { }

  ngOnInit() {
  }

  next() {
    if (this.currentIndex < this.locationsData.length - this.noOfItemView) {
      this.currentIndex++;
      this.dataToLsit = [...this.locationsData].splice(this.currentIndex, this.noOfItemView);
    }
  }
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.dataToLsit = [...this.locationsData].splice(this.currentIndex, this.noOfItemView);
    }
  }

  displayNoOfBlock() {
    if (this.referrer === this.pages.HOME) {
      this.noOfItemView = Constants.NUMBER.three;
    } else if (this.referrer === this.pages.DETAIL) {
      this.noOfItemView = Constants.NUMBER.two;
    } else {
      this.noOfItemView = Constants.NUMBER.two;
    }
  }

}
