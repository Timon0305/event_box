import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentHistoryService } from '../payment-history.service';
import { trackByObjectId, CheckRoles } from '@app/core/utils/common.util';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  paymentDetails$;
  paramsLength;
  trackByFn = trackByObjectId;
  isAdmin: boolean;
  paymentDetails;
  constructor(
    private readonly paymentHistoryService: PaymentHistoryService,
    private readonly checkRole: CheckRoles,
  ) { }

  ngOnInit() {
    this.isAdmin = this.paymentHistoryService.isAdmin();
    this.getPaymentDetails();
  }

  search(filter) {
    this.getPaymentDetails({ filter });
  }

  getPaymentDetails(params = {}) {
    this.paymentDetails$ = this.paymentHistoryService.getPaymentHistory(params)
      .pipe(map(res => {
        if (this.paymentDetails) {
          this.paymentDetails = {
            data: this.paymentDetails.data.concat(res.data),
            has_more: res.has_more
          };
        } else {
          this.paymentDetails = res;
        }
      }));
  }

  scrolled(hasMore) {
    if (hasMore) {
      this.getPaymentDetails({ created: this.paymentDetails.data.slice(-1)[0].created });
    }
  }

}
