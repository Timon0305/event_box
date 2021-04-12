import { Component, OnInit } from '@angular/core';
import { SharedRatingReviewService } from '../services/shared-rating-review.service';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '@app/config/constant';

@Component({
  selector: 'app-shared-rating-review-popup',
  templateUrl: './shared-rating-review-popup.component.html',
  styleUrls: ['./shared-rating-review-popup.component.scss'],
  providers: [SharedRatingReviewService]
})

export class SharedRatingReviewPopupComponent implements OnInit {
  ratingForm: FormGroup;
  constantNumber = Constants.NUMBER;
  constRating = Constants.SET_RATING;

  constructor(
    private readonly ratingReviewService: SharedRatingReviewService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.ratingForm = this.ratingReviewService.createRatingForm();
  }

}
