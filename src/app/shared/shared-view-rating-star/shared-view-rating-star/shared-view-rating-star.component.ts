import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-shared-view-rating-star',
  templateUrl: './shared-view-rating-star.component.html',
  styleUrls: ['./shared-view-rating-star.component.scss']
})
export class SharedViewRatingStarComponent implements OnInit {
  @Input() ratingCount: number;
  constNumber = Constants.NUMBER;
  starRating;
  showFullStar;
  showHalfStar;
  @Input() set rating(rating) {
    if (rating) {
      this.starRating = (`${rating}`).split('.');
      this.showFullStar = parseInt(this.starRating[0], this.constNumber.zero);
      if (this.starRating.length === this.constNumber.two && this.starRating[1] < this.constNumber.five) {
        this.showHalfStar = parseInt(this.starRating[0], this.constNumber.zero) + this.constNumber.one;
      } else if (this.starRating.length === this.constNumber.two && this.starRating[1] >= this.constNumber.five) {
        this.showFullStar = parseInt(this.starRating[0], this.constNumber.zero) + this.constNumber.one;
      }
    }
  }
  constructor() { }

  ngOnInit() {
    this.rating = (this.rating) ? this.rating : this.constNumber.zero;
  }

  counterStar(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }
}
