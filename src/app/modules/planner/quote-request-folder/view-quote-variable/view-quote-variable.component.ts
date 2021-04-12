import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VariableInfoPopupComponent } from '@app/shared/variable-info-popup/variable-info-popup/variable-info-popup.component';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-view-quote-variable',
  templateUrl: './view-quote-variable.component.html',
  styleUrls: ['./view-quote-variable.component.scss'],
})
export class ViewQuoteVariableComponent implements OnInit, OnDestroy {
  readonly destroyed$ = new Subject();

  @Input() quoteInfo;
  constructor(
    readonly activeModal: NgbActiveModal, private readonly modalService: NgbModal) { }

  ngOnInit() {
  }

  edit() {
    const variableInfo = {
      category: this.quoteInfo.category, event: this.quoteInfo.events._id,
      product: this.quoteInfo.product._id, subCategory: this.quoteInfo.subCategory, vendor: this.quoteInfo.vendor._id
    };
    const productAndVendorName = {
      productName: this.quoteInfo.products.name,
      vendorName: this.quoteInfo.vendors.name
    };
    const modalref =
      this.modalService.open(VariableInfoPopupComponent, {
        backdrop: 'static',
        size: 'xl', windowClass: 'modal-extra-large', centered: true
      });
    modalref.componentInstance.isEdit = true;
    modalref.componentInstance.quoteData = this.quoteInfo;
    modalref.componentInstance.varibaleApiParams = variableInfo;
    modalref.componentInstance.productAndVendorName = productAndVendorName;
    modalref.componentInstance.eventTimezone = this.quoteInfo.events.eventTimezone;
    modalref.result.then(result => {
      this.activeModal.close(result);
    }).catch(errror => {
      this.activeModal.close();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
