import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RatingReviewService } from '../services/rating-review.service';

@Component({
  selector: 'app-view-rating-review',
  templateUrl: './view-rating-review.component.html',
  styleUrls: ['./view-rating-review.component.scss'],
  providers: [RatingReviewService]
})
export class ViewRatingReviewComponent implements OnInit {
  @Input() data;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  counterStar(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }

}

