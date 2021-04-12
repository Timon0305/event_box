import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Messages } from '@app/config/messages';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';


@Component({
  selector: 'app-pay-setup-subscription-fees',
  templateUrl: './pay-setup-subscription-fees.component.html',
  styleUrls: ['./pay-setup-subscription-fees.component.scss']
})
export class PaySetupSubscriptionFeesComponent implements OnInit {
  @Input() user;
  forCanceledSubscription = false;
  constant = Messages.SUBSCRIPTION_TYPES;
  percentSign = Constants.PROMO_CODE.PERCENT_SIGN;

  constructor(public activeModal: NgbActiveModal, private readonly router: Router) { }

  ngOnInit() {
  }

  navigateToPaymentPage() {
    this.router.navigate(['vendor/add-credit-card']).then(res => this.activeModal.close());
  }

}
