import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { RequestService } from '@app/core/http/request-service';
import { Constants } from '@app/config/constant';
import { map } from 'rxjs/internal/operators/map';
import { IElasticSearch } from '@app/models/IElasticSearch';
import { priceValidator } from '@app/core/validators/price.validator';

@Injectable()
export class RequestQuoteService {

  constructor(
    private readonly fb: FormBuilder,
    private readonly request: RequestService) { }

  createQuoteForm() {
    return this.fb.group({
      quantity: ['', Validators.compose([Validators.required, priceValidator])],
      price: ['', Validators.compose([Validators.required, priceValidator])],
      deliveryFee: ['', Validators.compose([priceValidator])],
      laborFee: ['', Validators.compose([priceValidator])],
      tax: ['', Validators.compose([priceValidator])],
      productId: [null],
      totalPrice: [null],
      vendorNotes: ['', Validators.compose([Validators.required])],
      additionalCharges: this.fb.array([this.createAdditionalChargesForm()]),
    });
  }

  createAdditionalChargesForm(name = null, price = null) {
    return this.fb.group({
      name: [name],
      price: [price, Validators.compose([priceValidator])]
    });
  }

  createAdditionalProductsForm(
    product = null,
    quantity = '',
    price = null,
    description = null, additionalGuide = null,
    totalPrice = 1,
    name = null) {
    return this.fb.group({
      product: [product],
      quantity: [quantity, Validators.compose([Validators.required, priceValidator])],
      price: [price, Validators.compose([Validators.required, priceValidator])],
      description: [description],
      additionalGuide: [additionalGuide],
      totalPrice: [totalPrice],
      name: [name]
    });
  }

  getAdditionalProducts(params) {
    return this.request.getWithParams<IElasticSearch>(`${Constants.ENDPOINTS.productsSearch}`, params);
  }

  updateAdditionProductForm(productControl, detail) {
    return productControl.push(this.createAdditionalProductsForm(detail.data._id,
      '1',
      detail.data.price,
      detail.data.description,
      detail.data.additionalDetails,
      detail.data.price * 1,
      detail.data.name));
  }

  patchInitialForm(productControl, detail) {
    return productControl.patchValue([{
      product: detail.data._id,
      quantity: 1,
      price: detail.data.price,
      description: detail.data.description,
      additionalGuide: detail.data.additionalDetails,
      name: detail.data.name
    }]);
  }


  patchQuoteForm(form, quoteDetail) {
    form.patchValue({
      quantity: quoteDetail.latestReply ? quoteDetail.latestReply.quantity : quoteDetail.quantity,
      price: quoteDetail.latestReply ? quoteDetail.latestReply.price : quoteDetail.products.price,
      deliveryFee: (quoteDetail.latestReply && quoteDetail.latestReply.deliveryFee) ? quoteDetail.latestReply.deliveryFee : '',
      laborFee: (quoteDetail.latestReply && quoteDetail.latestReply.laborFee) ? quoteDetail.latestReply.laborFee : '',
      tax: (quoteDetail.latestReply && quoteDetail.latestReply.tax) ? quoteDetail.latestReply.tax : '',
      vendorNotes: (quoteDetail.latestReply && quoteDetail.latestReply.vendorNotes) ? quoteDetail.latestReply.vendorNotes : '',
    });
    if (quoteDetail.latestReply && quoteDetail.latestReply.additionalCharges &&
       quoteDetail.latestReply.additionalCharges.length) {
      this.patchAdditionChargesForm(form, quoteDetail);
    }
    if (quoteDetail.latestReply && quoteDetail.latestReply.additionalProducts &&
       quoteDetail.latestReply.additionalProducts.length) {
      this.patchAdditionalProducts(form, quoteDetail);
    }
  }

  patchAdditionalProducts(form, quoteDetail) {
    form.addControl('additionalProducts', this.fb.array([this.createAdditionalProductsForm()]));
    quoteDetail.latestReply.additionalProducts.forEach((additionalProducts, index) => {
      if (!index) {
        const optArr = form.controls.additionalProducts as FormArray;
        optArr.removeAt(index);
      }
      const additionalProd = form.get('additionalProducts') as FormArray;
      additionalProd.push(this.createAdditionalProductsForm(
        additionalProducts.product,
        additionalProducts.quantity,
        additionalProducts.price,
        additionalProducts.description,
        additionalProducts.additionalGuide,
        additionalProducts.price * additionalProducts.quantity,
        additionalProducts.name
      ));
    });

  }

  patchAdditionChargesForm(form, quoteDetail) {
    quoteDetail.latestReply.additionalCharges.forEach((additionalCharges, index) => {
      if (!index) {
        const optArr = form.controls.additionalCharges as FormArray;
        optArr.removeAt(index);
      }
      const addChargesForm = form.get('additionalCharges') as FormArray;
      addChargesForm.push(this.createAdditionalChargesForm(additionalCharges.name, additionalCharges.price));
    });
  }

  sendQuoteRequest(formValue, quoteId) {
    return this.request.patch(`${Constants.ENDPOINTS.sendQuote}/${quoteId}`, formValue).pipe(map(res => res));

  }

  updateQuoteRequest(formValue, quoteId, replyId) {
    return this.request.patch(`${Constants.ENDPOINTS.quotes}/${quoteId}/replies/${replyId}`, formValue).pipe(map(res => res));
  }

  getGrandTotal(form) {
    const subTotal = (form.value.quantity * form.value.price) +
      (Number(form.value.deliveryFee) + Number(form.value.laborFee) + Number(form.value.tax));
    let additionalProductSum = 0;
    if (form.value.additionalProducts) {
      form.value.additionalProducts.forEach(additionalProduct => {
        if (additionalProduct.price && additionalProduct.quantity) {
          additionalProductSum = additionalProductSum + (additionalProduct.price * additionalProduct.quantity);
        }
      });
    }
    let additionalChargesSum = 0;
    if (form.value.additionalCharges) {
      form.value.additionalCharges.forEach(additionalCharges => {
        if (additionalCharges.price) {
          additionalChargesSum = additionalChargesSum + Number(additionalCharges.price);
        }
      });
    }
    return subTotal + additionalProductSum + additionalChargesSum;
  }
}
