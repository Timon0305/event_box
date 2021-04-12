import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Constants } from '@app/config/constant';
import { FormArray, FormBuilder } from '@angular/forms';
import { RequestQuoteService } from '../service/request-quote.service';
import { CommonService } from '@app/core/services/common/common.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-quote-product-pricing',
  templateUrl: './quote-product-pricing.component.html',
  styleUrls: ['./quote-product-pricing.component.scss'],
  providers: [RequestQuoteService, CommonService]
})
export class QuoteProductPricingComponent implements OnInit, OnDestroy {
  newCharged: FormArray;
  @Input() form;
  @Input() quoteDetail;
  @Input() otherProductDetails;
  readonly destroyed$ = new Subject();
  total = 0;
  quoteValidation = Constants.QUOTE_REQUEST_FORM;

  constructor(
    private readonly requestQuoteService: RequestQuoteService,
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService
  ) { }

  ngOnInit() {
    this.total = this.requestQuoteService.getGrandTotal(this.form);
    this.grandTotal();
  }

  addNewChargesControl() {
    this.newCharged = this.form.get('additionalCharges') as FormArray;
    this.newCharged.push(this.requestQuoteService.createAdditionalChargesForm());
  }

  removeControl(index) {
    const optArr = this.form.controls.additionalCharges as FormArray;
    optArr.removeAt(index);
  }

  removeAdditionalProduct(index) {
    const optArr = this.form.controls.additionalProducts as FormArray;
    optArr.removeAt(index);
    this.form.controls.productId.setValue(null);
  }

  addNewProduct() {
    if (!this.form.controls.additionalProducts) {
      this.form.addControl('additionalProducts', this.fb.array([this.requestQuoteService.createAdditionalProductsForm()]));
      this.getSelectedProduct(false);
    } else {
      this.getSelectedProduct(true);
    }
  }

  getSelectedProduct(exists) {
    this.commonService.getProductById(this.form.controls.productId.value).pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.patchForm(res, exists);
    });
  }
  patchForm(detail, exists) {
    const productControl = this.form.controls.additionalProducts as FormArray;
    if (!exists) {
      this.requestQuoteService.patchInitialForm(productControl, detail);
    } else {
      this.requestQuoteService.updateAdditionProductForm(productControl, detail);
    }

  }

  grandTotal() {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.total = this.requestQuoteService.getGrandTotal(this.form);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
